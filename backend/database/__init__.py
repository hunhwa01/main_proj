from .session import AsyncSessionLocal, engine, get_db
from .models import Base
from supabase import create_client, Client
import os

# Supabase 연결 정보
SUPABASE_URL = "https://ivymmfqgtgqcgfxblvnj.supabase.co"
SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml2eW1tZnFndGdxY2dmeGJsdm5qIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczODgxODQ1MywiZXhwIjoyMDU0Mzk0NDUzfQ.JjKyQROGKa5TdUhlOSEXCAyOdX1aYolC5Qv4Uy6Fh6g"

# Supabase 클라이언트 생성
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

# Supabase Storage Bucket
bucket_name = "pets"