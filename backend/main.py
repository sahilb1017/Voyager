import fastapi as _fastapi
import fastapi.security as _security
import sqlalchemy.orm as _orm
import services as _services
import schemas as _schemas
from fastapi.middleware.cors import CORSMiddleware


app = _fastapi.FastAPI()

origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/account/create")
async def create_account(account: _schemas.AccountCreate, db: _orm.Session = _fastapi.Depends(_services.get_db)):
    db_user = await _services.get_account_by_email(account.email, db)

    if db_user.first():
        raise _fastapi.HTTPException(status_code=400, detail="An account with this email already exists!")

    return await _services.create_account(account, db)
    

@app.put("/account/update")
async def update_account(account: _schemas.Account, db: _orm.Session = _fastapi.Depends(_services.get_db)):
    return await _services.update_account(account, db)


@app.post("/account/create/user")
async def create_update(user: _schemas.User, db: _orm.Session = _fastapi.Depends(_services.get_db)):
    return await _services.create_user(user, db)


@app.post("/account/create/company")
async def create_company(company: _schemas.Company, db: _orm.Session = _fastapi.Depends(_services.get_db)):
    return await _services.create_company(company, db)


@app.post("/account/create/inspector")
async def create_inspector(inspector: _schemas.Inspector, db: _orm.Session = _fastapi.Depends(_services.get_db)):
    return await _services.create_inspector(inspector, db)


@app.post("/account/login")
async def login_account(account: _schemas.AccountCreate, db: _orm.Session = _fastapi.Depends(_services.get_db)):
    user = await _services.authenticate_account(account.email, account.password, db)
    if not user:
        raise _fastapi.HTTPException(status_code=401, detail="Invalid Credentials")
    return user


@app.post("/vehicles/create")
async def create_vehicle(vehicle: _schemas.VehicleCreate, db: _orm.Session = _fastapi.Depends(_services.get_db)):
    await _services.Vehicles.create_vehicle(vehicle, db)
    return True


@app.get("/vehicles/browse/get-cars")
async def browse_get_cars(db: _orm.Session = _fastapi.Depends(_services.get_db)):
    return await _services.Vehicles.get_cars_browse(db)


@app.get("/vehicles/browse/get-trucks")
async def browse_get_trucks(db: _orm.Session = _fastapi.Depends(_services.get_db)):
    return await _services.Vehicles.get_trucks_browse(db)


@app.get("/vehicles/browse/get-boats")
async def browse_get_boats(db: _orm.Session = _fastapi.Depends(_services.get_db)):
    return await _services.Vehicles.get_boats_browse(db)


@app.get("/vehicles/browse/get-motorcycles")
async def browse_get_motorcycles(db: _orm.Session = _fastapi.Depends(_services.get_db)):
    return await _services.Vehicles.get_motorcycles_browse(db)


@app.get("/vehicles/browse/get-jets")
async def browse_get_jets(db: _orm.Session = _fastapi.Depends(_services.get_db)):
    return await _services.Vehicles.get_jets_browse(db)


@app.get("/inspection/get-cars")
async def get_cars_to_inspect(db: _orm.Session = _fastapi.Depends(_services.get_db)):
   return await _services.Inspection.get_cars_to_inspect(db)


@app.get("/inspection/get-trucks")
async def get_trucks_to_inspect(db: _orm.Session = _fastapi.Depends(_services.get_db)):
   return await _services.Inspection.get_trucks_to_inspect(db)


@app.get("/inspection/get-boats")
async def get_boats_to_inspect(db: _orm.Session = _fastapi.Depends(_services.get_db)):
   return await _services.Inspection.get_boats_to_inspect(db)


@app.get("/inspection/get-motorcycles")
async def get_motorcycles_to_inspect(db: _orm.Session = _fastapi.Depends(_services.get_db)):
   return await _services.Inspection.get_motorcycles_to_inspect(db)


@app.get("/inspection/get-jets")
async def get_jets_to_inspect(db: _orm.Session = _fastapi.Depends(_services.get_db)):
   return await _services.Inspection.get_jets_to_inspect(db)


@app.post("/inspection/create")
async def create_report(report: _schemas.IRCreate, db: _orm.Session = _fastapi.Depends(_services.get_db)):
    return await _services.Inspection.create_inspection_report(report, db)


@app.post("/booking/create")
async def create_booking(booking: _schemas.BookingCreate, db: _orm.Session = _fastapi.Depends(_services.get_db)):
    return await _services.Booking.create_booking(booking, db)


@app.post("/booking/find-coupon")
async def find_coupon(coupon: _schemas.Coupon, db:  _orm.Session = _fastapi.Depends(_services.get_db)):
    print(coupon.coupon)
    couponn = await _services.Booking.get_coupon(coupon, db)

    if not couponn:
        raise _fastapi.HTTPException(status_code=404, detail="Coupon does not exist")
    
    return couponn


@app.post("/booking/get-booked")
async def get_booked(user: _schemas.RetrieveInfo, db:  _orm.Session = _fastapi.Depends(_services.get_db)):
    return await _services.Booking.get_booked_vehicles(user, db)


@app.post("/inspection/get-pending")
async def get_pending(user: _schemas.RetrieveInfo, db:  _orm.Session = _fastapi.Depends(_services.get_db)):
    return await _services.Inspection.get_pending(user, db)


@app.post("/inspection/get-approved")
async def get_approved(user: _schemas.RetrieveInfo, db:  _orm.Session = _fastapi.Depends(_services.get_db)):
    return await _services.Inspection.get_approved(user, db)


@app.post("/inspection/get-booked")
async def get_booked(user: _schemas.RetrieveInfo, db:  _orm.Session = _fastapi.Depends(_services.get_db)):
    return await _services.Inspection.get_booked(user, db)