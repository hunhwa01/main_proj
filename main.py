from fastapi import FastAPI, Form, Request
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles
from fastapi.responses import RedirectResponse, HTMLResponse
import sqlite3

app = FastAPI()

# Static 파일 설정
app.mount("/static", StaticFiles(directory="static"), name="static")

# 템플릿 디렉토리 설정
templates = Jinja2Templates(directory="templates")

# 메인 페이지
@app.get("/")
def main_page(request: Request):
    return templates.TemplateResponse("map.html", {"request": request})

