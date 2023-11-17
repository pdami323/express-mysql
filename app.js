var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var userRouter = require('./routes/userRoutes');
var commentRouter = require('./routes/commentRoutes');
var companyRouter = require('./routes/companyRoutes');
var bookRouter = require('./routes/bookRoutes');

//시퀄라이즈
const {sequelize} = require('./models/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//서버 실행 시 mysql과 연결
sequelize.sync({force: false})  //서버 실행 시마다 테이블을 재생성할건지에 대한 여부(동기화)
.then(()=>{
  console.log('데이터베이스 연결 성공');
})
.catch((err)=>{
  console.error(err);
});

app.use(logger('dev'));
app.use(express.json());                                  //json 형태의 requestBody를 파싱하기 위해 사용
app.use(express.urlencoded({ extended: false }));         //application/x-www-form-urlencoded 형태의 requestBody를 파싱하기 위해 사용 - true이면 다른 인코딩 방식
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));  //static 파일경로 설정 - 클라이언트에서 동작하는 자바스크립트나 css, html과 같은 리소스 파일들을 지칭

app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/comment', commentRouter);
app.use('/company', companyRouter);
app.use('/book', bookRouter);

// catch 404 and forward to error handler
//등록되지 않은 path로 요청이 오면 404페이지를 만들어 에러처리 핸들러로 넘김
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  // error 템플릿에 전달할 데이터를 설정
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
