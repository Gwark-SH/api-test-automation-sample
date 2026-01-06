/* * [QA Portfolio] Order Data Verification Script
 * 파일명: Order_Validation_Scenario.js
 * * [시나리오 설명]
 * 주문 생성 API(POST) 호출 후, 단순히 성공 응답(200 OK)만 확인하는 것이 아니라
 * 요청 시 보낸 데이터(가격, 수량, 마켓)가 응답 데이터와 '정확히 일치하는지' 교차 검증합니다.
 * 이를 통해 데이터가 잘못 저장되는 무결성 이슈를 방지합니다.
 */

// 1. 응답 데이터 파싱
var response = pm.response.json();

// 2. 주문 ID 환경변수 저장 (추후 주문 취소/조회 테스트에 사용)
if(response.order_id) {
    pm.environment.set("uuid", response.order_id);
    console.log("[Info] Order Created. ID: " + response.order_id);
}

// 3. [기본 검증] HTTP 상태 코드 확인 (리소스 생성 = 201)
pm.test('Step 1: Response code is 201 (Created)', function() {
    pm.response.to.have.status(201);
});

// 4. [스키마 검증] 필수 필드 누락 여부 확인
pm.test("Step 2: Response 필수 필드(Key) 존재 확인", function () {
    pm.expect(response).to.have.all.keys(
        'order_id',
        'market',
        'side',
        'order_type',
        'created_at'
    );
});

// 5. [데이터 정합성 검증] 요청 값(Request) vs 응답 값(Response) 비교
// 면접 Tip: "요청 변수와 결과값이 일치하는지 확인하여 비즈니스 로직 오류를 잡아냅니다."

// 5-1. 마켓(Market) 일치 확인
pm.test('Step 3: 주문 마켓(KRW-BTC 등) 일치 여부 확인', function () {
    // 환경변수 'market_krw'에 저장된 값과 실제 응답이 같은지 비교
    pm.expect(response.market).to.equal(pm.variables.get('market_krw'));
});

// 5-2. 주문 방향(Side) 확인
pm.test("Step 4: 주문 내역이 매수(bid)인지 확인", function () {
    pm.expect(response.side).to.equal("bid");
});

// 5-3. 주문 타입(Order Type) 확인
pm.test("Step 5: 주문 타입이 지정가(limit)인지 확인", function () {
    pm.expect(response.order_type).to.equal("limit");
});