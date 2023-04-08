import fastapi as _fastapi
import fastapi.security as _security
import sqlalchemy.orm as _orm
import services as _services
import schemas as _schemas

app = _fastapi.FastAPI()

@app.post("/account/create")
async def create_account(account: _schemas.AccountCreate, db: _orm.Session = _fastapi.Depends(_services.get_db)):
    db_user = await _services.get_account_by_email(account.email, db)

    if db_user.first():
        raise _fastapi.HTTPException(status_code=400, detail="An account with this email already exists!")

    return await _services.create_account(account, db)
    

@app.put("/account/update")
async def update_account(account: _schemas.Account, db: _orm.Session = _fastapi.Depends(_services.get_db)):
    return await _services.update_account(account, db)

@app.put("/account/update/user")
async def update_user(user: _schemas.User, db: _orm.Session = _fastapi.Depends(_services.get_db)):
    return await _services.update_user(user, db)


@app.post("/token")
async def generate_token(form_data: _security.OAuth2PasswordRequestForm = _fastapi.Depends(), db: _orm.Session = _fastapi.Depends(_services.get_db)):
    user = await _services.authenticate_account(form_data.username, form_data.password, db)
    
    if not user:
        raise _fastapi.HTTPException(status_code=401, detail="Invalid Credentials")
    
    return await _services.create_token(user)


@app.get("/account/me", response_model=_schemas.Account)
async def get_account(user: _schemas.Account = _fastapi.Depends(_services.get_current_account)):
    return user