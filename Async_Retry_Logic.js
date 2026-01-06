/* * [QA Portfolio] Asynchronous Polling & Retry Logic
 * 파일명: Async_Retry_Logic.js
 * * [시나리오 설명]
 * 주문 체결이나 외부 연동 등 처리에 시간이 걸리는 API의 경우, 즉시 결과를 확인할 수 없습니다.
 * 따라서 원하는 상태값(Status: 5600)이 반환될 때까지 일정 간격(2초)으로 
 * API를 재호출(Polling)하여 테스트 안정성을 확보하는 로직입니다.
 */

// 1. 응답 데이터 파싱
var res = JSON.parse(responseBody);
var req_name = pm.info.requestName; // 현재 실행 중인 요청 이름 가져오기

// 2. [로직 분기] 상태 코드에 따른 재시도 결정
// 목표 상태: "5600" (처리가 완료되었거나, 특정 에러 코드를 확인해야 하는 상황)

if (res.status == "5600") {
    // Case A: 원하는 상태 도달 (성공)
    console.log("[Success] Expected Status Reached: " + res.status);
    
    // 최종 검증 수행
    pm.test("검증 성공: Status code is 5600", function () {
        pm.expect(res.status).to.equal("5600");
    });

} else {
    // Case B: 아직 처리 중이거나 다른 상태 (재시도 필요)
    console.log("[Polling] Current Status: " + res.status + ". Retrying in 2 seconds...");
    
    // 2초(2000ms) 대기 후
    setTimeout(function(){
        console.log("Waited 2s, retrying now...");
    }, 2000);
    
    // 현재 요청(Request)을 다시 실행하도록 스케줄링 (Loop)
    // 면접 Tip: "setNextRequest를 활용해 Postman 러너에서 자동으로 재시도하게 만들었습니다."
    postman.setNextRequest(req_name); 
}

// 3. 메시지 검증 (방어 코드)
pm.test("기본 검증: 응답 메시지 존재 여부", function () {
    pm.expect(res.message).to.be.ok; 
});