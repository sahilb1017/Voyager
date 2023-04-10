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


@app.post("/account /create/user")
async def create_update(user: _schemas.User, db: _orm.Session = _fastapi.Depends(_services.get_db)):
    return await _services.create_user(user, db)


@app.post("/account/create/company")
async def create_company(company: _schemas.Company, db: _orm.Session = _fastapi.Depends(_services.get_db)):
    return await _services.create_company(company, db)


@app.post("/account/create/inspector")
async def create_inspector(inspector: _schemas.Inspector, db: _orm.Session = _fastapi.Depends(_services.get_db)):
    return await _services.create_inspector(inspector, db)


@app.get("/account/login")
async def login_account(account: _schemas.AccountCreate, db: _orm.Session = _fastapi.Depends(_services.get_db)):
    user = await _services.authenticate_account(account.email, account.password, db)
    if not user:
        raise _fastapi.HTTPException(status_code=401, detail="Invalid Credentials")
    return user

@app.post("/vehicles/create")
async def create_vehicle(vehicle: _schemas.VehicleCreate, db: _orm.Session = _fastapi.Depends(_services.get_db)):
    await _services.create_vehicle(vehicle, db)
    return True