const companyController = require('../controller/CompanyController');

const router = require('express').Router();

router.route('/').post(companyController.insertCompany);
router.route('/:id').put(companyController.updateCompany).get(companyController.selectCompany);

module.exports = router;