# 🚀 QA Automation & Scenario Testing Portfolio

### 👋 Introduction
안녕하세요! **"비효율을 기술로 해결하는 QA"** 곽성현입니다.
이 저장소는 실무에서 경험한 **API 데이터 정합성 검증**과 **비동기 처리(Polling) 자동화** 로직을 재구성한 코드 베이스입니다.
단순히 Status Code(200 OK)만 확인하는 것을 넘어, **Business Logic & Data Integrity**를 보장하기 위한 고민을 담았습니다.

### 🛠 Tech Stack
- **Language:** JavaScript (Postman Sandbox)
- **Tools:** Postman, Git
- **Key Concepts:** REST API Testing, Data Validation, Async Polling, HMAC Authentication

---

### 📂 File Descriptions

#### 1. `Order_Validation_Scenario.js` (데이터 정합성 교차 검증)
> **Scenario:** 주문 생성(POST) 후, 응답된 데이터가 요청한 값과 정확히 일치하는지 검증합니다.
- **Why:** API가 200 OK를 반환하더라도, DB에 잘못된 가격이나 수량이 저장되는 **무결성 이슈**를 방지하기 위함입니다.
- **Key Point:** `pm.expect()`를 활용하여 Request vs Response 데이터의 1:1 매칭 수행.

#### 2. `Async_Retry_Logic.js` (비동기 처리 & 재시도 로직)
> **Scenario:** 서버 처리가 지연되는 비동기 작업(예: 체결 대기) 시, 완료 상태가 될 때까지 기다리는 로직입니다.
- **Why:** 네트워크 지연이나 대량 트래픽 상황에서 **Test Flakiness(불안정한 테스트)**를 줄이고 안정성을 확보합니다.
- **Key Point:** `postman.setNextRequest`와 `setTimeout`을 활용한 Polling 구현.

---

### 📮 Contact
- **Email:** rhkr8670@naver.com
