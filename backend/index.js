const express = require("express");
const bodyParser = require("body-parser");

// corsポリシーに抵触するため、その対策としてcorsを利用する
const cors = require("cors");
const constractor = require("./public/const");
const attendanceManageController = require("./controller/attendanceManageController");
const authenticationController = require("./controller/authenticationController");
const clientFieldController = require("./controller/clientFieldController");
const contactBoxController = require("./controller/contactBoxController");
const excelController = require("./controller/excelController");
const loginController = require("./controller/loginController");
const mainController = require("./controller/mainController");
const ownCompanyController = require("./controller/ownCompanyController");
const ownWorkerAllController = require("./controller/ownWorkerAllController");
const passwordResetController = require("./controller/passwordResetController");
const subCompanyAllController = require("./controller/subCompanyAllController");
const stubController = require("./controller/stubController");
const workFieldController = require("./controller/workFieldController");
const commonLogic = require("./logic/commonLogic");

const app = express();
app.use(bodyParser.json());

//異なるサーバ間でのやり取り許可（オリジン間）
app.use(cors({ origin: true, credentials: true }));

app.set("errorMessage", constractor.ErrorMessage);
app.set("successMessage", constractor.SuccessMessage);
app.set("column", constractor.Colum);

app.use("/attendanceManage", attendanceManageController);
app.use("/clientField", clientFieldController);
app.use("/contactBox", contactBoxController);
app.use("/excel", excelController);
app.use("/login", loginController);
app.use("/main", mainController);
app.use("/ownCompany", ownCompanyController);
app.use("/ownWorkerAll", ownWorkerAllController);
app.use("/subCompanyAll", subCompanyAllController);
app.use("/passwordReset", passwordResetController);
app.use("/workField", workFieldController);

app.use("/stub", stubController);
app.use("/serviceTest", loginController);

app.all("/*", authenticationController);

app.listen(process.env.PORT || 3000);
