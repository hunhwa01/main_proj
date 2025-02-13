from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from backend.database.models import User
from typing import List

async def get_all_users(db: AsyncSession) -> List[User]:
    result = await db.execute(select(User))
    return result.scalars().all()
