import os
import httpx
from fastapi import FastAPI, Request, HTTPException, status
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from prometheus_client import make_asgi_app, Counter, Histogram
from dotenv import load_dotenv

load_dotenv()

# --- Configuration ---
COINCAP_API_BASE_URL = os.getenv("COINCAP_API_BASE_URL", "https://rest.coincap.io/v3")
COINCAP_API_KEY = os.getenv("COINCAP_API_KEY", "")
AUTH_TOKEN = os.getenv("AUTH_TOKEN", "your_super_secret_token")

# --- FastAPI App ---
app = FastAPI(
    title="Cloud Analytics Dashboard Backend",
    description="FastAPI backend for fetching crypto data and providing metrics.",
    version="1.0.0",
)

# --- CORS ---
app.add_middleware(
    CORSMiddleware,
   allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Prometheus Metrics ---
REQUEST_COUNT = Counter("http_requests_total", "Total HTTP requests", ["method", "endpoint"])
REQUEST_LATENCY = Histogram("http_request_duration_seconds", "HTTP request latency", ["method", "endpoint"])
metrics_app = make_asgi_app()
app.mount("/metrics", metrics_app)

# --- Token Auth Middleware ---
@app.middleware("http")
async def authenticate_request(request: Request, call_next):
    # Allow unauthenticated access for these paths:
    if request.url.path in ["/", "/health", "/metrics"]:
        return await call_next(request)

    # Let preflight OPTIONS requests pass through for CORS
    if request.method == "OPTIONS":
        return await call_next(request)

    auth_header = request.headers.get("Authorization")
    if not auth_header or not auth_header.startswith("Bearer "):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Missing or invalid Authorization header. Use 'Bearer <YOUR_TOKEN>'",
            headers={"WWW-Authenticate": "Bearer"},
        )

    token = auth_header.split(" ")[1]
    if token != AUTH_TOKEN:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Invalid authentication token")

    return await call_next(request)

# --- Routes ---
@app.get("/")
async def read_root():
    return {"message": "Welcome to the Cloud Analytics Dashboard Backend!"}

@app.get("/health")
async def health_check():
    return {"status": "ok"}

@app.get("/api/prices")
async def get_crypto_prices(request: Request):
    method = request.method
    endpoint = "/api/prices"

    with REQUEST_LATENCY.labels(method=method, endpoint=endpoint).time():
        try:
            REQUEST_COUNT.labels(method=method, endpoint=endpoint).inc()

            headers = {
                "Authorization": f"Bearer {COINCAP_API_KEY}"
            }

            async with httpx.AsyncClient() as client:
                response = await client.get(f"{COINCAP_API_BASE_URL}/assets?limit=10", headers=headers)
                response.raise_for_status()
                data = response.json()

            prices = []
            for asset in data.get("data", []):
                prices.append({
                    "id": asset.get("id"),
                    "symbol": asset.get("symbol"),
                    "name": asset.get("name"),
                    "priceUsd": float(asset.get("priceUsd", 0)),
                    "changePercent24Hr": float(asset.get("changePercent24Hr", 0)),
                })
            return JSONResponse(content={"data": prices})

        except httpx.HTTPStatusError as e:
            raise HTTPException(
                status_code=e.response.status_code,
                detail=f"CoinCap API error: {e.response.text}"
            )
        except httpx.RequestError as e:
            raise HTTPException(
                status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
                detail=f"Network error: {e}"
            )
        except Exception as e:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Internal error: {e}"
            )
