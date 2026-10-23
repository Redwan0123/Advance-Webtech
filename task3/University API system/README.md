                                                         # 🎓 University System API

                                                                ## 👤 INFORMATION

                                                         **Name:** _MD. SALAUDDIN SHAON

                                                         **ID:** 23-54463-3

                                                         **Course:** _ADVANCED PROGRAMMING IN WEB TECHNOLOG_

                                                         **Section:** C 



## 📖 Overview

**Dependency Injection** is a design pattern where a class receives its dependencies from an external source instead of creating them itself. NestJS has a built-in DI container that creates and shares service instances automatically.

This project shows how services depend on each other:

- inside the **same module**,
- across **different modules**, and
- in a **circular** way, resolved safely with `forwardRef()`.


### Installation & Run

# 1. Install dependencies
npm install

# 2. Run in development (watch) mode
npm run start:dev


The server starts on **http://localhost:3000** (override with the `PORT` environment variable).


## 🧪 Test Cases & Screenshots


### Part A — Intra-Module DI 



#### ✅ Test A1 — Get all courses


![Test A1 - Get all courses](../screenshort/a1.png)

#### ✅ Test A2 — Get course by ID

- **Request:** `GET http://localhost:3000/course/101`


![Test A2 - Get course by ID](../screenshort/a2.png)

#### ✅ Test A3 — Create a course

- **Request:** `POST http://localhost:3000/course`


![Test A3 - Create course](../screenshort/a3.png)

---

### Part B — Inter-Module DI 


#### ✅ Test B1 — Get all enrollments

- **Request:** `GET http://localhost:3000/enrollment`


![Test B1 - Get enrollments](../screenshort/b1.png)

#### ✅ Test B2 — Enroll a student (valid course)

- **Request:** `POST http://localhost:3000/enrollment`

![Test B2 - Enroll student](../screenshort/b2.png)

#### ⚠️ Test B3 — Enroll a student (course ID that does not exist)

- **Request:** `POST http://localhost:3000/enrollment`
- 

![Test B3 - Enroll with unknown course](../screenshort/b3.png)

---

### Part C — Circular Dependency 


#### ✅ Test C1 — Send a notification

- **Request:** `POST http://localhost:3000/notification/send`


![Test C1 - Send notification](../screenshort/c1.png)

#### ✅ Test C2 — Check enrollment and notify

- **Request:** `POST http://localhost:3000/notification/check`


![Test C2 - Check enrollment](../screenshort/c2.png)

#### ✅ Test C3 — Enroll a student and receive a notification

- **Request:** `POST http://localhost:3000/enrollment`


![Test C3 - Enroll with notification](../screenshort/c3.png)

#### ✅ Test C4 — App starts without circular dependency errors


![Test C4 - Application startup log](../screenshort/c4.png)


## 🏛️ Architecture Rules Followed

- ✔️ `@Injectable()` is on every service class
- ✔️ Constructor injection is used everywhere. No service is created with `new`
- ✔️ Every service is listed in `providers[]` of its module
- ✔️ A service used by another module is listed in `exports[]`
- ✔️ The consuming module imports the **module**, not the service directly
- ✔️ `forwardRef()` is used on **both sides** of the circular dependency, in both modules and both constructors
- ✔️ Business logic lives in the **Services**, controllers only call services


