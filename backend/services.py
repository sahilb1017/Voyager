import database as _db
import sqlalchemy.orm as _orm
import sqlalchemy as _sql
import schemas as _schemas
import passlib.hash as _hash
from datetime import date



def get_db():
    db = _db.SessionLocal()
    try:
        yield db
    finally:
        db.close()

async def get_account_by_email(email: str, db: _orm.Session):
    return db.execute(_sql.sql.text(f'SELECT * FROM ACCOUNT WHERE Email = "{email}"'))

async def create_account(account: _schemas.AccountCreate, db: _orm.Session):
    hashed = _hash.bcrypt.hash(account.password)
    db.execute(_sql.sql.text(f'INSERT INTO ACCOUNT VALUES ("{account.email}", "{hashed}", NULL, NULL, NULL, NULL, NULL, NULL)'))
    db.commit()

    user = db.execute(_sql.sql.text(f'SELECT * FROM ACCOUNT WHERE Email = "{account.email}"'))
    user = user.first()

    return _schemas.Account(
        email=user.Email, ph_Num=user.Ph_Num, city=user.City, 
        postal_Code=user.Postal_Code, street=user.Street, province=user.Province, acc_type=user.User_Type
    )


async def authenticate_account(email: str, password: str, db: _orm.Session):
    user =  db.execute(_sql.sql.text(f'SELECT * FROM ACCOUNT WHERE Email = "{email}"'))
    found_user = user.first()

    if not found_user:
        return False
    
    if not _hash.bcrypt.verify(password, found_user.Password):
        return False
    
    user_obj = _schemas.Account(
        email=found_user.Email, ph_Num=found_user.Ph_Num, city=found_user.City, 
        postal_Code=found_user.Postal_Code, street=found_user.Street, province=found_user.Province, acc_type=found_user.User_Type
    )

    return user_obj


async def update_account(account: _schemas.Account, db: _orm.Session):
    db.execute(_sql.sql.text(f'''UPDATE ACCOUNT 
                                SET Ph_Num = "{account.ph_Num}",
                                    City = "{account.city}",
                                    Postal_Code = "{account.postal_Code}",
                                    Street = "{account.street}",
                                    Province = "{account.province}", 
                                    User_Type = "{account.acc_type}"
                                WHERE Email = "{account.email}"'''))
    db.commit()
    user =  db.execute(_sql.sql.text(f'SELECT * FROM ACCOUNT WHERE Email = "{account.email}"'))
    found_user = user.first()   

    user_obj = _schemas.Account(
        email=found_user.Email, ph_Num=found_user.Ph_Num, city=found_user.City, 
        postal_Code=found_user.Postal_Code, street=found_user.Street, province=found_user.Province, acc_type=found_user.User_Type
    )
    
    return user_obj


async def create_user(user: _schemas.User, db: _orm.Session):
    db.execute(_sql.sql.text(f'INSERT INTO USER VALUES ("{user.email}", "{user.first_name}", "{user.last_name}", "{user.dob}")'))
    db.commit()
    found_user =  db.execute(_sql.sql.text(f'SELECT * FROM USER WHERE Email = "{user.email}"'))
    found_user = found_user.first()   

    return _schemas.User(
        email=found_user.Email, first_name=found_user.First_Name, last_name=found_user.Last_Name, dob=found_user.DOB
    )


async def create_company(company: _schemas.Company, db: _orm.Session):
    db.execute(_sql.sql.text(f'INSERT INTO COMPANY VALUES ("{company.email}", "{company.comp_name}")'))  
    db.commit()

    found_company =  db.execute(_sql.sql.text(f'SELECT * FROM Company WHERE Email = "{company.email}"'))
    found_company = found_company.first()

    return _schemas.Company(
        email=found_company.Email, comp_name=found_company.Comp_Name
    )


async def create_inspector(inspector: _schemas.Inspector, db: _orm.Session):
    db.execute(_sql.sql.text(f'INSERT INTO INSPECTOR VALUES ("{inspector.email}", "{inspector.first_name}", "{inspector.last_name}", "{inspector.dob}")'))
    db.commit()
    found_inspector =  db.execute(_sql.sql.text(f'SELECT * FROM INSPECTOR WHERE Email = "{inspector.email}"'))
    found_inspector = found_inspector.first()   

    return _schemas.Inspector(
        email=found_inspector.Email, first_name=found_inspector.First_Name, last_name=found_inspector.Last_Name, dob=found_inspector.DOB
    )




class Vehicles:
    async def create_vehicle(vehicle: _schemas.VehicleCreate, db: _orm.Session):
        mechanic_id = 1
        cleaner_id = 1
        today = str(date.today())
        
        db.execute(_sql.sql.text(f'''INSERT INTO VEHICLE VALUES(
                                    "{vehicle.reg_num}",
                                    "{vehicle.license}",
                                    {vehicle.num_passengers},
                                    "{vehicle.mileage}",
                                    "{vehicle.model}",
                                    "{vehicle.make}",
                                    "{vehicle.color}",
                                    "{vehicle.price}",
                                    1,
                                    0,
                                    {mechanic_id},
                                    {cleaner_id},
                                    "{vehicle.owner_id}",
                                    "{today}",
                                    "{vehicle.vehicle_type}"
                                )'''))
        db.commit()

        db.execute(_sql.sql.text(f'INSERT INTO {vehicle.vehicle_type} VALUES ("{vehicle.reg_num}", "{vehicle.extra}")'))
        db.commit()


    async def get_cars_browse(db: _orm.Session):
        cars_to_send = list()

        cars = db.execute(_sql.sql.text(f''' SELECT v.REG_NUM, v.License, v.Num_Of_Passengers, v.Mileage, v.Model, v.Make,
                                        v.Color, v.Price, v.Availability, v.Reviewed, v.Mechanic_ID, v.Cleaner_ID, v.Owner_ID,
                                        v.Date_Posted, c.Type, i.Damages_Level, i.Cleanliness_Level, i.Overall_Rating
                                        FROM (VEHICLE AS v JOIN CAR AS c ON v.REG_NUM = c.REG_NUM)
                                        JOIN INSPECTION_REPORT AS i ON v.REG_NUM = i.Vehicle_Reg
                                        WHERE v.Reviewed = 1 AND v.Availability = 1
                                        '''))    
        for c in cars:
            x = _schemas.InspectionCar(
                reg_num=c.REG_NUM, license=c.License, num_passengers=c.Num_Of_Passengers, mileage=c.Mileage, model=c.Model, make=c.Make, color=c.Color,
                price=c.Price, availability=c.Availability, reviewed=c.Reviewed, mechanic_id=c.Mechanic_ID, cleaner_id=c.Cleaner_ID, owner_id=c.Owner_ID, 
                date_posted=c.Date_Posted, type=c.Type, vehicle_type="Car", damages=c.Damages_Level, cleanliness=c.Cleanliness_Level, 
                overall=c.Overall_Rating
            )
            cars_to_send.append(x)
        
        return cars_to_send
    

    async def get_trucks_browse(db: _orm.Session):
        trucks_to_send = list()
        
        trucks = db.execute(_sql.sql.text(f''' SELECT v.REG_NUM, v.License, v.Num_Of_Passengers, v.Mileage, v.Model, v.Make,
                                        v.Color, v.Price, v.Availability, v.Reviewed, v.Mechanic_ID, v.Cleaner_ID, v.Owner_ID,
                                        v.Date_Posted, t.Tonnage, i.Damages_Level, i.Cleanliness_Level, i.Overall_Rating
                                        FROM (VEHICLE AS v JOIN TRUCK AS t ON v.REG_NUM = t.REG_NUM)
                                        JOIN INSPECTION_REPORT AS i ON v.REG_NUM = i.Vehicle_Reg
                                        WHERE v.Reviewed = 1 AND v.Availability = 1
                                        '''))
        for t in trucks:
            x = _schemas.InspectionTruck(
                reg_num=t.REG_NUM, license=t.License, num_passengers=t.Num_Of_Passengers, mileage=t.Mileage, model=t.Model, make=t.Make, color=t.Color,
                price=t.Price, availability=t.Availability, reviewed=t.Reviewed, mechanic_id=t.Mechanic_ID, cleaner_id=t.Cleaner_ID, owner_id=t.Owner_ID, 
                date_posted=t.Date_Posted, tonnage=t.Tonnage, vehicle_type="Truck", damages=t.Damages_Level, cleanliness=t.Cleanliness_Level, 
                overall=t.Overall_Rating
            )
            trucks_to_send.append(x)
        
        return trucks_to_send  


    async def get_boats_browse(db: _orm.Session):
        boats_to_send = list()
        
        boats = db.execute(_sql.sql.text(f''' SELECT v.REG_NUM, v.License, v.Num_Of_Passengers, v.Mileage, v.Model, v.Make,
                                        v.Color, v.Price, v.Availability, v.Reviewed, v.Mechanic_ID, v.Cleaner_ID, v.Owner_ID,
                                        v.Date_Posted, b.Knots, i.Damages_Level, i.Cleanliness_Level, i.Overall_Rating
                                        FROM (VEHICLE AS v JOIN BOAT AS b ON v.REG_NUM = b.REG_NUM)
                                        JOIN INSPECTION_REPORT AS i ON v.REG_NUM = i.Vehicle_Reg
                                        WHERE v.Reviewed = 1 AND v.Availability = 1
                                        '''))
        for b in boats:
            x = _schemas.InspectionBoat(
                reg_num=b.REG_NUM, license=b.License, num_passengers=b.Num_Of_Passengers, mileage=b.Mileage, model=b.Model, make=b.Make, color=b.Color,
                price=b.Price, availability=b.Availability, reviewed=b.Reviewed, mechanic_id=b.Mechanic_ID, cleaner_id=b.Cleaner_ID, owner_id=b.Owner_ID, 
                date_posted=b.Date_Posted, knots=b.Knots, vehicle_type="Boat", damages=b.Damages_Level, cleanliness=b.Cleanliness_Level, 
                overall=b.Overall_Rating
            )
            boats_to_send.append(x)
        
        return boats_to_send
    

    async def get_motorcycles_browse(db: _orm.Session):
        motorcycles_to_send = list()
        
        motorcycles = db.execute(_sql.sql.text(f''' SELECT v.REG_NUM, v.License, v.Num_Of_Passengers, v.Mileage, v.Model, v.Make,
                                        v.Color, v.Price, v.Availability, v.Reviewed, v.Mechanic_ID, v.Cleaner_ID, v.Owner_ID,
                                        v.Date_Posted, m.CC, i.Damages_Level, i.Cleanliness_Level, i.Overall_Rating
                                        FROM (VEHICLE AS v JOIN MOTORCYCLE AS m ON v.REG_NUM = m.REG_NUM)
                                        JOIN INSPECTION_REPORT AS i ON v.REG_NUM = i.Vehicle_Reg
                                        WHERE v.Reviewed = 1 AND v.Availability = 1
                                        '''))
        for m in motorcycles:
            x = _schemas.InspectionMotorcycle(
                reg_num=m.REG_NUM, license=m.License, num_passengers=m.Num_Of_Passengers, mileage=m.Mileage, model=m.Model, make=m.Make, color=m.Color,
                price=m.Price, availability=m.Availability, reviewed=m.Reviewed, mechanic_id=m.Mechanic_ID, cleaner_id=m.Cleaner_ID, owner_id=m.Owner_ID, 
                date_posted=m.Date_Posted, cc=m.CC, vehicle_type="Motorcycle",damages=m.Damages_Level, cleanliness=m.Cleanliness_Level, 
                overall=m.Overall_Rating
            )
            motorcycles_to_send.append(x)
        
        return motorcycles_to_send
    

    async def get_jets_browse(db: _orm.Session):
        jets_to_send = list()
        
        jets = db.execute(_sql.sql.text(f''' SELECT v.REG_NUM, v.License, v.Num_Of_Passengers, v.Mileage, v.Model, v.Make,
                                        v.Color, v.Price, v.Availability, v.Reviewed, v.Mechanic_ID, v.Cleaner_ID, v.Owner_ID,
                                        v.Date_Posted, j.TBO, i.Damages_Level, i.Cleanliness_Level, i.Overall_Rating
                                        FROM (VEHICLE AS v JOIN JET AS j ON v.REG_NUM = j.REG_NUM)
                                        JOIN INSPECTION_REPORT AS i ON v.REG_NUM = i.Vehicle_Reg
                                        WHERE v.Reviewed = 1 AND v.Availability = 1
                                        '''))
        for j in jets:
            x = _schemas.InspectionJet(
                reg_num=j.REG_NUM, license=j.License, num_passengers=j.Num_Of_Passengers, mileage=j.Mileage, model=j.Model, make=j.Make, color=j.Color,
                price=j.Price, availability=j.Availability, reviewed=j.Reviewed, mechanic_id=j.Mechanic_ID, cleaner_id=j.Cleaner_ID, owner_id=j.Owner_ID, 
                date_posted=j.Date_Posted, tbo=j.TBO, vehicle_type="Jet", damages=j.Damages_Level, cleanliness=j.Cleanliness_Level, 
                overall=j.Overall_Rating
            )
            jets_to_send.append(x)
        
        return jets_to_send
        




class Inspection:
    async def get_cars_to_inspect(db: _orm.Session):
        cars_to_send = list()
        
        cars = db.execute(_sql.sql.text(f''' SELECT v.REG_NUM, v.License, v.Num_Of_Passengers, v.Mileage, v.Model, v.Make,
                                        v.Color, v.Price, v.Availability, v.Reviewed, v.Mechanic_ID, v.Cleaner_ID, v.Owner_ID,
                                        v.Date_Posted, c.Type FROM VEHICLE AS v JOIN CAR AS C ON v.REG_NUM = c.REG_NUM
                                        WHERE v.Reviewed = 0
                                        '''))
        for c in cars:
            x = _schemas.Car(
                reg_num=c.REG_NUM, license=c.License, num_passengers=c.Num_Of_Passengers, mileage=c.Mileage, model=c.Model, make=c.Make, color=c.Color,
                price=c.Price, availability=c.Availability, reviewed=c.Reviewed, mechanic_id=c.Mechanic_ID, cleaner_id=c.Cleaner_ID, owner_id=c.Owner_ID, 
                date_posted=c.Date_Posted, type=c.Type, vehicle_type="Car"
            )
            cars_to_send.append(x)
        
        return cars_to_send


    async def get_trucks_to_inspect(db: _orm.Session):
        trucks_to_send = list()
        
        trucks = db.execute(_sql.sql.text(f''' SELECT v.REG_NUM, v.License, v.Num_Of_Passengers, v.Mileage, v.Model, v.Make,
                                        v.Color, v.Price, v.Availability, v.Reviewed, v.Mechanic_ID, v.Cleaner_ID, v.Owner_ID,
                                        v.Date_Posted, t.Tonnage FROM VEHICLE AS v JOIN TRUCK AS t ON v.REG_NUM = t.REG_NUM
                                        WHERE v.Reviewed = 0
                                        '''))
        for t in trucks:
            x = _schemas.Truck(
                reg_num=t.REG_NUM, license=t.License, num_passengers=t.Num_Of_Passengers, mileage=t.Mileage, model=t.Model, make=t.Make, color=t.Color,
                price=t.Price, availability=t.Availability, reviewed=t.Reviewed, mechanic_id=t.Mechanic_ID, cleaner_id=t.Cleaner_ID, owner_id=t.Owner_ID, 
                date_posted=t.Date_Posted, tonnage=t.Tonnage, vehicle_type="Truck"
            )
            trucks_to_send.append(x)
        
        return trucks_to_send


    async def get_boats_to_inspect(db: _orm.Session):
        boats_to_send = list()
        
        boats = db.execute(_sql.sql.text(f''' SELECT v.REG_NUM, v.License, v.Num_Of_Passengers, v.Mileage, v.Model, v.Make,
                                        v.Color, v.Price, v.Availability, v.Reviewed, v.Mechanic_ID, v.Cleaner_ID, v.Owner_ID,
                                        v.Date_Posted, b.Knots FROM VEHICLE AS v JOIN BOAT AS b ON v.REG_NUM = b.REG_NUM
                                        WHERE v.Reviewed = 0
                                        '''))
        for b in boats:
            x = _schemas.Boat(
                reg_num=b.REG_NUM, license=b.License, num_passengers=b.Num_Of_Passengers, mileage=b.Mileage, model=b.Model, make=b.Make, color=b.Color,
                price=b.Price, availability=b.Availability, reviewed=b.Reviewed, mechanic_id=b.Mechanic_ID, cleaner_id=b.Cleaner_ID, owner_id=b.Owner_ID, 
                date_posted=b.Date_Posted, knots=b.Knots,vehicle_type="Boat"
            )
            boats_to_send.append(x)
        
        return boats_to_send


    async def get_motorcycles_to_inspect(db: _orm.Session):
        motorcycles_to_send = list()
        
        motorcycles = db.execute(_sql.sql.text(f''' SELECT v.REG_NUM, v.License, v.Num_Of_Passengers, v.Mileage, v.Model, v.Make,
                                        v.Color, v.Price, v.Availability, v.Reviewed, v.Mechanic_ID, v.Cleaner_ID, v.Owner_ID,
                                        v.Date_Posted, m.CC FROM VEHICLE AS v JOIN MOTORCYCLE AS m ON v.REG_NUM = m.REG_NUM
                                        WHERE v.Reviewed = 0
                                        '''))
        for m in motorcycles:
            x = _schemas.Motorcycle(
                reg_num=m.REG_NUM, license=m.License, num_passengers=m.Num_Of_Passengers, mileage=m.Mileage, model=m.Model, make=m.Make, color=m.Color,
                price=m.Price, availability=m.Availability, reviewed=m.Reviewed, mechanic_id=m.Mechanic_ID, cleaner_id=m.Cleaner_ID, owner_id=m.Owner_ID, 
                date_posted=m.Date_Posted, cc=m.CC, vehicle_type="Motorcycle"
            )
            motorcycles_to_send.append(x)
        
        return motorcycles_to_send


    async def get_jets_to_inspect(db: _orm.Session):
        jets_to_send = list()
        
        jets = db.execute(_sql.sql.text(f''' SELECT v.REG_NUM, v.License, v.Num_Of_Passengers, v.Mileage, v.Model, v.Make,
                                        v.Color, v.Price, v.Availability, v.Reviewed, v.Mechanic_ID, v.Cleaner_ID, v.Owner_ID,
                                        v.Date_Posted, j.TBO FROM VEHICLE AS v JOIN JET AS j ON v.REG_NUM = j.REG_NUM
                                        WHERE v.Reviewed = 0
                                        '''))
        for j in jets:
            x = _schemas.Jet(
                reg_num=j.REG_NUM, license=j.License, num_passengers=j.Num_Of_Passengers, mileage=j.Mileage, model=j.Model, make=j.Make, color=j.Color,
                price=j.Price, availability=j.Availability, reviewed=j.Reviewed, mechanic_id=j.Mechanic_ID, cleaner_id=j.Cleaner_ID, owner_id=j.Owner_ID, 
                date_posted=j.Date_Posted, tbo=j.TBO, vehicle_type="Jet"
            )
            jets_to_send.append(x)
        
        return jets_to_send
    

    async def create_inspection_report(report: _schemas.IRCreate, db: _orm.Session):
        db.execute(_sql.sql.text(f'''INSERT INTO INSPECTION_REPORT(Damages_Level, Cleanliness_Level, Overall_Rating, Inspector_Email, Vehicle_Reg, Decision) 
                                 VALUES ("{report.damages}", "{report.cleanliness}", "{report.overall}", "{report.inspector_email}", "{report.vehicle_reg}", {report.decision})'''))
        db.commit() 

        if(report.decision == 1):
            db.execute(_sql.sql.text(f'UPDATE VEHICLE SET Reviewed = 1 WHERE REG_NUM = "{report.vehicle_reg}"'))
            db.commit()

        else:
            db.execute(_sql.sql.text(f'DELETE FROM VEHICLE WHERE REG_NUM = "{report.vehicle_reg}"'))
            db.commit()
            db.execute(_sql.sql.text(f'DELETE FROM {report.type} WHERE REG_NUM = "{report.vehicle_reg}"'))
            db.commit()

        return report;

    async def get_pending(user: _schemas.RetrieveInfo, db:  _orm.Session):
        to_send = list()

        cars = db.execute(_sql.sql.text(f''' SELECT v.REG_NUM, v.License, v.Num_Of_Passengers, v.Mileage, v.Model, v.Make,
                                        v.Color, v.Price, v.Availability, v.Reviewed, v.Mechanic_ID, v.Cleaner_ID, v.Owner_ID,
                                        v.Date_Posted, c.Type FROM VEHICLE AS v JOIN CAR AS C ON v.REG_NUM = c.REG_NUM        
                                        WHERE v.Reviewed = 0 AND v.Owner_ID = "{user.email}"'''))
        
        for c in cars:
            x = _schemas.Car(
                reg_num=c.REG_NUM, license=c.License, num_passengers=c.Num_Of_Passengers, mileage=c.Mileage, model=c.Model, make=c.Make, color=c.Color,
                price=c.Price, availability=c.Availability, reviewed=c.Reviewed, mechanic_id=c.Mechanic_ID, cleaner_id=c.Cleaner_ID, owner_id=c.Owner_ID, 
                date_posted=c.Date_Posted, type=c.Type, vehicle_type="Car"
            )
            to_send.append(x)

        trucks = db.execute(_sql.sql.text(f''' SELECT v.REG_NUM, v.License, v.Num_Of_Passengers, v.Mileage, v.Model, v.Make,
                                        v.Color, v.Price, v.Availability, v.Reviewed, v.Mechanic_ID, v.Cleaner_ID, v.Owner_ID,
                                        v.Date_Posted, t.Tonnage FROM VEHICLE AS v JOIN TRUCK AS t ON v.REG_NUM = t.REG_NUM
                                        WHERE v.Reviewed = 0 AND v.Owner_ID = "{user.email}"'''))
        for t in trucks:
            x = _schemas.Truck(
                reg_num=t.REG_NUM, license=t.License, num_passengers=t.Num_Of_Passengers, mileage=t.Mileage, model=t.Model, make=t.Make, color=t.Color,
                price=t.Price, availability=t.Availability, reviewed=t.Reviewed, mechanic_id=t.Mechanic_ID, cleaner_id=t.Cleaner_ID, owner_id=t.Owner_ID, 
                date_posted=t.Date_Posted, tonnage=t.Tonnage, vehicle_type="Truck"
            )
            to_send.append(x)

        boats = db.execute(_sql.sql.text(f''' SELECT v.REG_NUM, v.License, v.Num_Of_Passengers, v.Mileage, v.Model, v.Make,
                                        v.Color, v.Price, v.Availability, v.Reviewed, v.Mechanic_ID, v.Cleaner_ID, v.Owner_ID,
                                        v.Date_Posted, b.Knots FROM VEHICLE AS v JOIN BOAT AS b ON v.REG_NUM = b.REG_NUM
                                        WHERE v.Reviewed = 0 AND v.Owner_ID = "{user.email}"'''))
        for b in boats:
            x = _schemas.Boat(
                reg_num=b.REG_NUM, license=b.License, num_passengers=b.Num_Of_Passengers, mileage=b.Mileage, model=b.Model, make=b.Make, color=b.Color,
                price=b.Price, availability=b.Availability, reviewed=b.Reviewed, mechanic_id=b.Mechanic_ID, cleaner_id=b.Cleaner_ID, owner_id=b.Owner_ID, 
                date_posted=b.Date_Posted, knots=b.Knots, vehicle_type="Boat"
            )
            to_send.append(x)

        motorcycles = db.execute(_sql.sql.text(f''' SELECT v.REG_NUM, v.License, v.Num_Of_Passengers, v.Mileage, v.Model, v.Make,
                                        v.Color, v.Price, v.Availability, v.Reviewed, v.Mechanic_ID, v.Cleaner_ID, v.Owner_ID,
                                        v.Date_Posted, m.CC FROM VEHICLE AS v JOIN MOTORCYCLE AS m ON v.REG_NUM = m.REG_NUM
                                        WHERE v.Reviewed = 0 AND v.Owner_ID = "{user.email}"'''))
        for m in motorcycles:
            x = _schemas.Motorcycle(
                reg_num=m.REG_NUM, license=m.License, num_passengers=m.Num_Of_Passengers, mileage=m.Mileage, model=m.Model, make=m.Make, color=m.Color,
                price=m.Price, availability=m.Availability, reviewed=m.Reviewed, mechanic_id=m.Mechanic_ID, cleaner_id=m.Cleaner_ID, owner_id=m.Owner_ID, 
                date_posted=m.Date_Posted, cc=m.CC, vehicle_type="Motorcycle"
            )
            to_send.append(x)

        jets = db.execute(_sql.sql.text(f''' SELECT v.REG_NUM, v.License, v.Num_Of_Passengers, v.Mileage, v.Model, v.Make,
                                        v.Color, v.Price, v.Availability, v.Reviewed, v.Mechanic_ID, v.Cleaner_ID, v.Owner_ID,
                                        v.Date_Posted, j.TBO FROM VEHICLE AS v JOIN JET AS j ON v.REG_NUM = j.REG_NUM
                                        WHERE v.Reviewed = 0 AND v.Owner_ID = "{user.email}"'''))
        for j in jets:
            x = _schemas.Jet(
                reg_num=j.REG_NUM, license=j.License, num_passengers=j.Num_Of_Passengers, mileage=j.Mileage, model=j.Model, make=j.Make, color=j.Color,
                price=j.Price, availability=j.Availability, reviewed=j.Reviewed, mechanic_id=j.Mechanic_ID, cleaner_id=j.Cleaner_ID, owner_id=j.Owner_ID, 
                date_posted=j.Date_Posted, tbo=j.TBO, vehicle_type="Jet"
            )
            to_send.append(x)
        return to_send
    
    async def get_approved(user: _schemas.RetrieveInfo, db:  _orm.Session):
        to_send = []

        cars = db.execute(_sql.sql.text(f''' SELECT v.REG_NUM, v.License, v.Num_Of_Passengers, v.Mileage, v.Model, v.Make,
                                        v.Color, v.Price, v.Availability, v.Reviewed, v.Mechanic_ID, v.Cleaner_ID, v.Owner_ID,
                                        v.Date_Posted, c.Type FROM VEHICLE AS v JOIN CAR AS C ON v.REG_NUM = c.REG_NUM        
                                        WHERE v.Reviewed = 1 AND v.Availability = 1 AND v.Owner_ID = "{user.email}"'''))
        
        for c in cars:
            x = _schemas.Car(
                reg_num=c.REG_NUM, license=c.License, num_passengers=c.Num_Of_Passengers, mileage=c.Mileage, model=c.Model, make=c.Make, color=c.Color,
                price=c.Price, availability=c.Availability, reviewed=c.Reviewed, mechanic_id=c.Mechanic_ID, cleaner_id=c.Cleaner_ID, owner_id=c.Owner_ID, 
                date_posted=c.Date_Posted, type=c.Type, vehicle_type="Car"
            )
            to_send.append(x)

        trucks = db.execute(_sql.sql.text(f''' SELECT v.REG_NUM, v.License, v.Num_Of_Passengers, v.Mileage, v.Model, v.Make,
                                        v.Color, v.Price, v.Availability, v.Reviewed, v.Mechanic_ID, v.Cleaner_ID, v.Owner_ID,
                                        v.Date_Posted, t.Tonnage FROM VEHICLE AS v JOIN TRUCK AS t ON v.REG_NUM = t.REG_NUM
                                        WHERE v.Reviewed = 1 AND v.Availability = 1 AND v.Owner_ID = "{user.email}"'''))
        for t in trucks:
            x = _schemas.Truck(
                reg_num=t.REG_NUM, license=t.License, num_passengers=t.Num_Of_Passengers, mileage=t.Mileage, model=t.Model, make=t.Make, color=t.Color,
                price=t.Price, availability=t.Availability, reviewed=t.Reviewed, mechanic_id=t.Mechanic_ID, cleaner_id=t.Cleaner_ID, owner_id=t.Owner_ID, 
                date_posted=t.Date_Posted, tonnage=t.Tonnage, vehicle_type="Truck"
            )
            to_send.append(x)

        boats = db.execute(_sql.sql.text(f''' SELECT v.REG_NUM, v.License, v.Num_Of_Passengers, v.Mileage, v.Model, v.Make,
                                        v.Color, v.Price, v.Availability, v.Reviewed, v.Mechanic_ID, v.Cleaner_ID, v.Owner_ID,
                                        v.Date_Posted, b.Knots FROM VEHICLE AS v JOIN BOAT AS b ON v.REG_NUM = b.REG_NUM
                                        WHERE v.Reviewed = 1 AND v.Availability = 1 AND v.Owner_ID = "{user.email}"'''))
        for b in boats:
            x = _schemas.Boat(
                reg_num=b.REG_NUM, license=b.License, num_passengers=b.Num_Of_Passengers, mileage=b.Mileage, model=b.Model, make=b.Make, color=b.Color,
                price=b.Price, availability=b.Availability, reviewed=b.Reviewed, mechanic_id=b.Mechanic_ID, cleaner_id=b.Cleaner_ID, owner_id=b.Owner_ID, 
                date_posted=b.Date_Posted, knots=b.Knots, vehicle_type="Boat"
            )
            to_send.append(x)

        motorcycles = db.execute(_sql.sql.text(f''' SELECT v.REG_NUM, v.License, v.Num_Of_Passengers, v.Mileage, v.Model, v.Make,
                                        v.Color, v.Price, v.Availability, v.Reviewed, v.Mechanic_ID, v.Cleaner_ID, v.Owner_ID,
                                        v.Date_Posted, m.CC FROM VEHICLE AS v JOIN MOTORCYCLE AS m ON v.REG_NUM = m.REG_NUM
                                        WHERE v.Reviewed = 1 AND v.Availability = 1 AND v.Owner_ID = "{user.email}"'''))
        for m in motorcycles:
            x = _schemas.Motorcycle(
                reg_num=m.REG_NUM, license=m.License, num_passengers=m.Num_Of_Passengers, mileage=m.Mileage, model=m.Model, make=m.Make, color=m.Color,
                price=m.Price, availability=m.Availability, reviewed=m.Reviewed, mechanic_id=m.Mechanic_ID, cleaner_id=m.Cleaner_ID, owner_id=m.Owner_ID, 
                date_posted=m.Date_Posted, cc=m.CC, vehicle_type="Motorcycle"
            )
            to_send.append(x)

        jets = db.execute(_sql.sql.text(f''' SELECT v.REG_NUM, v.License, v.Num_Of_Passengers, v.Mileage, v.Model, v.Make,
                                        v.Color, v.Price, v.Availability, v.Reviewed, v.Mechanic_ID, v.Cleaner_ID, v.Owner_ID,
                                        v.Date_Posted, j.TBO FROM VEHICLE AS v JOIN JET AS j ON v.REG_NUM = j.REG_NUM
                                        WHERE v.Reviewed = 1 AND v.Availability = 1 AND v.Owner_ID = "{user.email}"'''))
        for j in jets:
            x = _schemas.Jet(
                reg_num=j.REG_NUM, license=j.License, num_passengers=j.Num_Of_Passengers, mileage=j.Mileage, model=j.Model, make=j.Make, color=j.Color,
                price=j.Price, availability=j.Availability, reviewed=j.Reviewed, mechanic_id=j.Mechanic_ID, cleaner_id=j.Cleaner_ID, owner_id=j.Owner_ID, 
                date_posted=j.Date_Posted, tbo=j.TBO, vehicle_type="Jet"
            )
            to_send.append(x)
        return to_send
    
    async def get_booked(user: _schemas.RetrieveInfo, db:  _orm.Session):
        to_send = []
        approved = db.execute(_sql.sql.text(f'SELECT * FROM (VEHICLE AS v JOIN BOOKS AS b ON v.REG_NUM = b.Vehicle_ID) JOIN BOOKING AS q ON q.Booking_ID = b.Booking_ID WHERE v.Owner_ID = "{user.email}" AND v.Availability = 0'))

        for b in approved:
            streets = []
            locations = db.execute(_sql.sql.text(f'SELECT Street FROM LOCATION WHERE Location_ID = {b.PickUp_Location} OR Location_ID = {b.DropOff_Location}'))
            for l in locations:
                streets.append(l.Street)
            
            x = _schemas.BookedVehicle(
                num_passengers=b.Num_Of_Passengers, mileage=b.Mileage, model=b.Model, make=b.Make, color=b.Color, price=b.Price, 
                date_posted=b.Date_Posted, start_date=b.Start_Date, end_date=b.End_Date, pickup=streets[0], dropoff=streets[1], type=b.Type
            )

            to_send.append(x)

        return to_send
            


class Booking:
    async def create_booking(booking: _schemas.BookingCreate, db: _orm.Session):
        today = str(date.today())
        # # First we need to create 2 locations in the LOCATION table
        # #insert pickup location
        db.execute(_sql.sql.text(f'''INSERT INTO LOCATION(City, Postal_Code, Street, Province) 
                                VALUES ("{booking.pickup.city}", "{booking.pickup.postal_code}", "{booking.pickup.street}", "{booking.pickup.province}")'''))
        db.commit()

        #insert dropoff location
        db.execute(_sql.sql.text(f'''INSERT INTO LOCATION(City, Postal_Code, Street, Province) 
                                VALUES ("{booking.dropoff.city}", "{booking.dropoff.postal_code}", "{booking.dropoff.street}", "{booking.dropoff.province}")'''))
        db.commit()

        #get location ids for pickup and dropoff
        #0 is dropoff, 1 is pickup
        locationIDs = []
        locations = db.execute(_sql.sql.text(f'SELECT Location_ID FROM LOCATION ORDER BY Location_ID DESC LIMIT 2'))

        for l in locations:
            locationIDs.append(l.Location_ID)

        #Create booking row in BOOKING table
        db.execute(_sql.sql.text(f'''INSERT INTO BOOKING(Number_Days, Start_Date, End_Date, PickUp_Location, DropOff_Location, Insurance_ID, Coupon_ID)
                                VALUES({booking.num_days}, "{booking.start_date}", "{booking.end_date}", {locationIDs[1]}, {locationIDs[0]}, {booking.insurance_id}, {booking.coupon_id})
                                '''))
        db.commit()

        #Get booking id for created booking
        bookingID = 0
        bookingss = db.execute(_sql.sql.text(f'SELECT Booking_ID FROM BOOKING ORDER BY Booking_ID DESC LIMIT 1'))

        for b in bookingss:
            bookingID = b.Booking_ID
        
        db.execute(_sql.sql.text(f'''INSERT INTO BILL(Booking_ID, Cost, Bill_Date, Discount_Applied)
                                VALUES({bookingID}, {booking.cost}, "{today}", {booking.discount})
                                '''))
        db.commit()

        #Populate BOOKS table 
        db.execute(_sql.sql.text(f'INSERT INTO BOOKS VALUES ("{booking.vehicle_reg}", "{booking.email}", {bookingID})'))
        db.commit()

        #change vehicle availability
        db.execute(_sql.sql.text(f'UPDATE VEHICLE SET Availability = 0 WHERE REG_NUM = "{booking.vehicle_reg}"'))
        db.commit()

        return booking
    
    async def get_coupon(coupon: _schemas.Coupon, db: _orm.Session):
        couponn = db.execute(_sql.sql.text(f'SELECT * FROM COUPON WHERE Coupon_ID = {coupon.coupon}'))
        found_coupon = couponn.first()

        if not found_coupon:
            return False

        return _schemas.CouponSend(
            coupon=found_coupon.Coupon_ID, discount=found_coupon.Discount
        )
    

    async def get_booked_vehicles(user: _schemas.RetrieveInfo, db: _orm.Session):
        to_send = list()

        cars = db.execute(_sql.sql.text(f'''SELECT * FROM (((BOOKS AS B JOIN BOOKING AS q ON b.Booking_ID = q.Booking_ID) 
                                          JOIN VEHICLE as v on b.Vehicle_ID = v.REG_NUM) JOIN CAR AS c ON v.REG_NUM =  c.REG_NUM)
                                          JOIN INSPECTION_REPORT AS i on i.Vehicle_Reg = v.REG_NUM
                                          WHERE b.Email_ID = "{user.email}"'''))
        
        for b in cars:
            streets = []
            locations = db.execute(_sql.sql.text(f'SELECT Street FROM LOCATION WHERE Location_ID = {b.PickUp_Location} OR Location_ID = {b.DropOff_Location}'))
            for l in locations:
                streets.append(l.Street)   

            x = _schemas.BookedCar(
                num_passengers=b.Num_Of_Passengers, mileage=b.Mileage, model=b.Model, make=b.Make, color=b.Color, price=b.Price, 
                date_posted=b.Date_Posted, start_date=b.Start_Date, end_date=b.End_Date, pickup=streets[0], dropoff=streets[1], vehicle_type="Car", 
                type=b.Type, cleanliness=b.Cleanliness_Level, damages=b.Damages_Level, overall=b.Overall_Rating
            )
            to_send.append(x)


        trucks = db.execute(_sql.sql.text(f'''SELECT * FROM (((BOOKS AS B JOIN BOOKING AS q ON b.Booking_ID = q.Booking_ID) 
                                          JOIN VEHICLE as v on b.Vehicle_ID = v.REG_NUM) JOIN TRUCK AS c ON v.REG_NUM =  c.REG_NUM)
                                          JOIN INSPECTION_REPORT AS i on i.Vehicle_Reg = v.REG_NUM
                                          WHERE b.Email_ID = "{user.email}"'''))
        
        for b in trucks:
            streets = []
            locations = db.execute(_sql.sql.text(f'SELECT Street FROM LOCATION WHERE Location_ID = {b.PickUp_Location} OR Location_ID = {b.DropOff_Location}'))
            for l in locations:
                streets.append(l.Street)   

            x = _schemas.BookedTruck(
                num_passengers=b.Num_Of_Passengers, mileage=b.Mileage, model=b.Model, make=b.Make, color=b.Color, price=b.Price, 
                date_posted=b.Date_Posted, start_date=b.Start_Date, end_date=b.End_Date, pickup=streets[0], dropoff=streets[1], vehicle_type="Truck", 
                tonnage=b.Tonnage, cleanliness=b.Cleanliness_Level, damages=b.Damages_Level, overall=b.Overall_Rating
            )
            to_send.append(x)

        
        boats = db.execute(_sql.sql.text(f'''SELECT * FROM (((BOOKS AS B JOIN BOOKING AS q ON b.Booking_ID = q.Booking_ID) 
                                          JOIN VEHICLE as v on b.Vehicle_ID = v.REG_NUM) JOIN BOAT AS c ON v.REG_NUM =  c.REG_NUM)
                                          JOIN INSPECTION_REPORT AS i on i.Vehicle_Reg = v.REG_NUM
                                          WHERE b.Email_ID = "{user.email}"'''))
        
        for b in boats:
            streets = []
            locations = db.execute(_sql.sql.text(f'SELECT Street FROM LOCATION WHERE Location_ID = {b.PickUp_Location} OR Location_ID = {b.DropOff_Location}'))
            for l in locations:
                streets.append(l.Street)   

            x = _schemas.BookedBoat(
                num_passengers=b.Num_Of_Passengers, mileage=b.Mileage, model=b.Model, make=b.Make, color=b.Color, price=b.Price, 
                date_posted=b.Date_Posted, start_date=b.Start_Date, end_date=b.End_Date, pickup=streets[0], dropoff=streets[1], vehicle_type="Boat", 
                knots=b.Knots, cleanliness=b.Cleanliness_Level, damages=b.Damages_Level, overall=b.Overall_Rating
            )
            to_send.append(x)


        motorcycles = db.execute(_sql.sql.text(f'''SELECT * FROM (((BOOKS AS B JOIN BOOKING AS q ON b.Booking_ID = q.Booking_ID) 
                                          JOIN VEHICLE as v on b.Vehicle_ID = v.REG_NUM) JOIN MOTORCYCLE AS c ON v.REG_NUM =  c.REG_NUM)
                                          JOIN INSPECTION_REPORT AS i on i.Vehicle_Reg = v.REG_NUM
                                          WHERE b.Email_ID = "{user.email}"'''))
        
        for b in motorcycles:
            streets = []
            locations = db.execute(_sql.sql.text(f'SELECT Street FROM LOCATION WHERE Location_ID = {b.PickUp_Location} OR Location_ID = {b.DropOff_Location}'))
            for l in locations:
                streets.append(l.Street)   

            x = _schemas.BookedMotorcycle(
                num_passengers=b.Num_Of_Passengers, mileage=b.Mileage, model=b.Model, make=b.Make, color=b.Color, price=b.Price, 
                date_posted=b.Date_Posted, start_date=b.Start_Date, end_date=b.End_Date, pickup=streets[0], dropoff=streets[1], vehicle_type="Motorcycle", 
                cc=b.CC, cleanliness=b.Cleanliness_Level, damages=b.Damages_Level, overall=b.Overall_Rating
            )
            to_send.append(x)
        

        jets = db.execute(_sql.sql.text(f'''SELECT * FROM (((BOOKS AS B JOIN BOOKING AS q ON b.Booking_ID = q.Booking_ID) 
                                          JOIN VEHICLE as v on b.Vehicle_ID = v.REG_NUM) JOIN JET AS c ON v.REG_NUM =  c.REG_NUM)
                                          JOIN INSPECTION_REPORT AS i on i.Vehicle_Reg = v.REG_NUM
                                          WHERE b.Email_ID = "{user.email}"'''))
        
        for b in jets:
            streets = []
            locations = db.execute(_sql.sql.text(f'SELECT Street FROM LOCATION WHERE Location_ID = {b.PickUp_Location} OR Location_ID = {b.DropOff_Location}'))
            for l in locations:
                streets.append(l.Street)   

            x = _schemas.BookedJet(
                num_passengers=b.Num_Of_Passengers, mileage=b.Mileage, model=b.Model, make=b.Make, color=b.Color, price=b.Price, 
                date_posted=b.Date_Posted, start_date=b.Start_Date, end_date=b.End_Date, pickup=streets[0], dropoff=streets[1], vehicle_type="Jet", 
                tbo=b.TBO, cleanliness=b.Cleanliness_Level, damages=b.Damages_Level, overall=b.Overall_Rating
            )
            to_send.append(x)


        return to_send

    
