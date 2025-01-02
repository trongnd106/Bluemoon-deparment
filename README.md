# **Bluemoon Apartment Management System**

## **Technology used**

---

- **Language**: Java, Javascript, Typescript
- **Framework**: Spring Boot, ReactJS
- **Build tool**: Maven, Vite
- **Database**: H2 Database
- **VCS**: Git
- **Containerization**: Docker

## **Installation Instructions**

---

### **1. Run Local**

#### **1.1 System requirements**

- **Frontend**:
  - Node.js: **≥ 16.0.0**
  - npm: **≥ 8.0.0**
- **Backend**:
  - JDK: **≥ 17**
  - Maven: **≥ 3.6.0**

#### **1.2 Run Frontend**

Execute the following commands to launch frontend interface

```bash
cd frontend
npm install
npm start
```

#### **1.3 Run Backend**

Execute the following commands to launch backend server

```bash
cd backend
mvn install
mvn spring-boot:run
```

### **2. Run Docker**

Build and boot the entire system. Run docker container in the background mode

```bash
docker-compose up -d --build
```

Stop all containers

```bash
docker-compose stop
```

Delete container, network, volumes

```bash
docker-compose down --volumes
```
