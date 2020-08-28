let postId = 1 //id 초깃값

// posts 배열 초기 데이터
const posts = [
    {
        id: 1,
        title: '제목',
        body: '내용',
    },
]

/* 포스트 작성
POST /api/posts
{title, body}
 */
exports.write = ctx =>{ //exports로 내보내면 require로 불러와서 모듈로 사용가능
    //REST API의 Request Body 는 ctx.request.body에서 조회 가능
    const {title, body} = ctx.request.body;
    postId ++ // 기존 postId 값 1증가
    const post = {id: postId, title, body}
    posts.push(post)
    ctx.body = post
}

/* 포스트 목록 조회
GET /api/posts
 */
exports.list = ctx =>{
    ctx.body = posts
}

/* 
특정 포스트 조회
GET /api/posts/:id
 */
exports.read = cts =>{
    const {id} = ctx.params
    /* 주어진 id 값으로 포스트 찾기
    파라미터로 받아 온 값은 문자열 형식이므로 변환 필요
    비교할 posts.id 를 문자열로 변경하여 비교함 */
    const post = posts.find(p => p.id.toString() === id) //배열에서 find사용
    // 포스트가 없으면 오류 반환
    console.log(post)
    if(!post){
        ctx.status = 404
        ctx.body = {
            message: '포스트가 존재하지 않습니다.',
        }
        return;
    }
    ctx.body = post
}

/* 
특정 포스트 제거
DELETE /api/posts/:id
*/
exports.remove = ctx => {
    const {id} = ctx.params
    // 해당 id를 가진 post가 몇 번째인지 확인
    const index = posts.findIndex(p => p.id.toString() === id)
    // 포스트가 없으면 오류 반환
    if(index === -1){
        ctx.status = 404
        ctx.body = {
            message: '포스트가 존재하지 않습니다.',
        }
        return;
    }
    //index번째 아이템을 삭제
    posts.splice(index, 1) //splice: 배열에서 해당 index부터 n개 항목 삭제
    ctx.status = 204; // No Content
}

/* 
포스트 수정(교체)
PUT /api/posts/:id
{title, body}
 */
exports.replace = ctx => {
    //PUT메서드는 전체 포스트 정보를 입력하여 데이터를 통째로 교체함
    const {id} = ctx.params
    //posts의 인덱스 찾기
    const index = posts.findIndex(p => p.id.toString() === id)
    // 포스트가 없으면 오류 반환
    if(index === -1){
        ctx.status = 404
        ctx.body = {
            message: '포스트가 존재하지 않습니다.',
        }
        return;
    }
    //id를 제외한 기존 정보를 날리고, 전체 객체를 덮어 씌우기
    posts[index] = {
        id, 
        ...ctx.request.body, //변경할 정보
    }
    ctx.body = posts[index]
}

/* 
포스트 수정(특정 필드 변경)
PATCH /api/posts/:id
{title, body}
 */
exports.update = ctx =>{
    // PATCH 메서드는 주어진 필드만 교체합니다.
    const {id} = ctx.params
    const index = posts.findIndex(p => p.id.toString() === id)
    // 포스트가 없으면 오류 반환
    if(index === -1){
        ctx.status = 404
        ctx.body = {
            message: '포스트가 존재하지 않습니다.',
        }
        return;
    }
    // 기존 값에 정보를 덮어 씌우기
    posts[index] = {
        ...posts[index],
        ...ctx.request.body,
    }
    ctx.body = posts[index]
}



