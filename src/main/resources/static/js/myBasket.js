// 장바구니 화면 로드시
 /*<![CDATA[*/
$(function() {
    let basketList = JSON.parse(localStorage.getItem("basketList"));
    let newRow = '';

    if(basketList !== null){
        for(let i=0; i<basketList.length; i++){
                newRow += '<tr class="basketTableRow">';
                newRow += '<td class="td1 td2" style="width:10%">';
                newRow += '<input type="checkbox" name="select" id="oneCheck" value="oneCheck"><label for="oneCheck" />';
                newRow += '</td>';
                newRow += '<td class="td1 td2">'
                        + '<a href="/productDetail?id=' + basketList[i]["productId"] + '">'
                        + '<img id = "tablePImage" src="' + basketList[i]["productImage"] + '" alt=\"상품 이미지\" >' + '</a></td>';
                newRow += '<td class="td1 td2">' + basketList[i]["productName"] + '</td>';

                let optionRow = '<td class="td1 td2">';
                for(key in basketList[i]["productOptions"]) {
                    optionRow += '' + key + '&nbsp;&nbsp;&nbsp;'
                                    + basketList[i]["productOptions"][key] + '개 <br>';
                }
                optionRow += '</td>';
                newRow += optionRow;
                newRow += '<td class="td1 td2">' + basketList[i]["productPrice"] + '원</td>';


                newRow += '<td>' + '<button type="button" class="delBasketBtn" style="vertical-align : bottom;">'
                         + "X" + '</button>' + '</td>';                           // 결과: 삭제버튼
                newRow += '</tr>';

                // 새로운 행 추가
                $("#basketListTable").append(newRow);
                newRow = '';
                /*
                 roductTotalPrice += calculate;*/
            }
    }

    // 상품삭제 버튼 이벤트
    $(".delBasketBtn").on("click",function(e){
        Swal.fire({
          title: '삭제 하시겠습니까?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#B1450F',
          cancelButtonColor: '#D5B59C',
          confirmButtonText: 'Yes',
          cancelButtonText: 'No',
          background: '#F3F1ED'
        }).then((result) => {
          if (result.isConfirmed) {
            $(e.target).closest('tr').remove();
                  let tdArray = $(e.target).closest('tr').find('td');
                  let delName = tdArray[2].innerText;

                  // localStorage에서도 해당 상품 삭제
                  if(basketList !==null) {
                      for(let i=0; i<basketList.length; i++) {
                          if(basketList[i]["productName"] === delName) {
                              basketList.splice(i, 1);
                              localStorage.setItem("basketList",JSON.stringify(basketList));
                              break;
                          }
                      }
                  }
          }
        })
    });

});

function allCheckFunction(all) {
    const checkboxes = document.getElementsByName("select");

    checkboxes.forEach((checkbox) => {
      checkbox.checked = all.checked;
    })
    console.log(checkboxes);
}

// 장바구니 담기 -> localStorage에 저장
function saveBasket() {
        /*let table = document.getElementById('basketListTable');*/
        console.log(selectedMap);
        console.log(selectedMap.length);

        // 상품 옵션을 선택했다면
        if(selectedMap.size !== 0) {
            let productId = document.getElementById('productId').value;
            let productName = document.getElementById('pn').innerText;
            let productPrice = parseInt(document.getElementById('price').innerText, 10);
            let productImage = document.getElementById('productImage').src;
            let totalPrice = 0;
            let option = {};

            // selectedMap(전역변수) -> key : '사이즈,색상',  value : {사이즈, 색상, 수량}
            selectedMap.forEach((value, key) => {
                option[key] = value.count;
                totalPrice += (productPrice * value.count);
            });

            let product = {"productId" : productId,
                            "productImage" : productImage,
                            "productName" : productName,
                            "productOptions" : option,
                            "productPrice" : totalPrice
                            };

            let basketList = [];

            if(localStorage.getItem("basketList") === null) {   // 장바구니 이용이 처음이면 장바구니 생성
                basketList.push(product);
                let newBasketList = JSON.stringify(basketList);
                localStorage.setItem("basketList",newBasketList);
            }else{
                let prevBasketList = JSON.parse(localStorage.getItem("basketList"));
                let isExistProduct = false;

                for(let i=0; i<prevBasketList.length; i++){
                    // 아이디가 같은 상품이 이미 담겨 있다면
                    if(prevBasketList[i]["productId"] === productId){
                        isExistProduct = true;
                        let newOption = Object.keys(option);    // 현재 추가하는 옵션

                        // 추가를 원하는 옵션이 이미 존재하는지
                        for(let key of newOption) {
                            if(prevBasketList[i]["productOptions"].hasOwnProperty(key)){
                                prevBasketList[i]["productOptions"][key] += option[key];
                            }else{
                                prevBasketList[i]["productOptions"][key] = option[key];
                            }
                        }
                        prevBasketList[i]["productPrice"] += product["productPrice"];
                        break;  // 같은 상품을 찾았으니 더이상 순회하지 않음
                     }
                }
                // 새로운 상품을 추가하는 경우라면
                if(!isExistProduct) {
                    prevBasketList.push(product);
                }
                localStorage.setItem("basketList",JSON.stringify(prevBasketList));
            }

            // 장바구니 저장 완료 메시지
            Swal.fire({
              title: '장바구니에 담았습니다!',
              icon: 'success',
              showCancelButton: true,
              confirmButtonColor: '#C7B199',
              cancelButtonColor: '#C7B199',
              confirmButtonText: '장바구니 이동',
              cancelButtonText: '계속 쇼핑하기',
              background: '#F3F1ED'
            }).then((result) => {
              if (result.isConfirmed) {
                 location.href = "/myBasket";
              }
            })
        }
        // 아무 상품도 선택하지 않았다면
        else{
            Swal.fire({
              title: '옵션을 선택해주세요',
              icon: 'warning',
              confirmButtonColor: '#C7B199',
              confirmButtonText: '확인',
              background: '#F3F1ED'
            })
        }

}
/*]]>*/