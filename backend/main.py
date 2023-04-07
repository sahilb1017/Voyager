import fastapi as _fastapi
import fastapi.security as _security
import sqlalchemy.orm as _orm
import services as _services
import schemas as _schemas
from fastapi.encoders import jsonable_encoder

app = _fastapi.FastAPI()

@app.post("/users/create")
async def create_account(account: _schemas.AccountCreate, db: _orm.Session = _fastapi.Depends(_services.get_db)):
    db_user = await _services.get_account_by_email(account.email, db)

    if db_user.first():
        raise _fastapi.HTTPException(status_code=400, detail="An account with this email already exists!")

    return await _services.create_account(account, db)
    

@app.post("/token")
async def generate_token(form_data: _security.OAuth2PasswordRequestForm = _fastapi.Depends(), db: _orm.Session = _fastapi.Depends(_services.get_db)):
    user = await _services.authenticate_user(form_data.username, form_data.password, db)
    
    if not user:
        raise _fastapi.HTTPException(status_code=401, detail="Invalid Credentials")
    
    return await _services.create_token(user)