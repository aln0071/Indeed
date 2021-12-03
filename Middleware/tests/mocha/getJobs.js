/* eslint-disable import/order */
/* eslint-disable no-unused-vars */
/* eslint-disable linebreak-style */
/* eslint-disable no-undef */
const { assert } = require('chai');
const index = require('../../src/index');
const chai = require('chai');
chai.use(require('chai-http'));
const { expect } = require('chai');
const agent = require('chai').request.agent(index);
const router = require('express').Router();

describe('Get All Job', () => {
  it('should return all Jobs', (done) => {
    agent
      .get('/indeed/api/jobs?page=1&limit=100')
      .then((res) => {
        expect(res.body.length).to.not.equal(0);
        done();
      })
      .catch((error) => {
        assert.fail('An error occured. Please check the logs');
      });
  });
});

describe('Get Company Job', () => {
  it('should return all Jobs for a company', (done) => {
    agent
      .get('/indeed/api/company/123/jobs?page=1&limit=5')
      .then((res) => {
        expect(res.body.length).to.not.equal(0);
        done();
      })
      .catch((error) => {
        assert.fail('An error occured. Please check the logs');
      });
  });
});

describe('Get Job Seeker Details', () => {
  it('should return Job Seeker Details', (done) => {
    agent
      .get('/indeed/api/jobseeker/profile/123')
      .then((res) => {
        expect(res.statusCode).equal(200);
        done();
      })
      .catch((error) => {
        assert.fail('An error occured. Please check the logs');
      });
  });
});

describe('Get Applied Jobs', () => {
  it('should return Jobs applied by Job Seeker', (done) => {
    agent
      .get('/indeed/api/jobseeker/getAppliedJob/123')
      .then((res) => {
        expect(res.body.length).to.not.equal(0);
        done();
      })
      .catch((error) => {
        assert.fail('An error occured. Please check the logs');
      });
  });
});

describe('Get Company Details', () => {
  it('should return company details for specific ID', (done) => {
    agent
      .get('/indeed/api/companyDetails/61a32673a0660ee943876fc0')
      .then((res) => {
        expect(res.body.length).to.not.equal(0);
        done();
      })
      .catch((error) => {
        assert.fail('An error occured. Please check the logs');
      });
  });
});

describe('Get Location of All Jobs', () => {
  it('should return location of all Jobs', (done) => {
    agent
      .get('/indeed/api/jobs/locations')
      .then((res) => {
        expect(res.body.length).to.not.equal(0);
        done();
      })
      .catch((error) => {
        assert.fail('An error occured. Please check the logs');
      });
  });
});

describe('Get All Reviews', () => {
  it('should return reviews of a company', (done) => {
    agent
      .get(
        '/indeed/api/jobseeker/619d1f2d333e9575297d0b73/reviews?page=2&limit=5',
      )
      .then((res) => {
        expect(res.body.length).to.not.equal(0);
        done();
      })
      .catch((error) => {
        assert.fail('An error occured. Please check the logs');
      });
  });
});

describe('Get User Reviews', () => {
  it('should return reviews posted by user', (done) => {
    agent
      .get('/indeed/api/jobseeker/reviews/123')
      .then((res) => {
        expect(res.body.length).to.not.equal(0);
        done();
      })
      .catch((error) => {
        assert.fail('An error occured. Please check the logs');
      });
  });
});

describe('Get Jobs based on Location', () => {
  it('should return jobs based on location', (done) => {
    agent
      .get('/indeed/api/jobs?what=software&where=milpitas&page=1&limit=10')
      .then((res) => {
        expect(res.body.length).to.not.equal(0);
        done();
      })
      .catch((error) => {
        assert.fail('An error occured. Please check the logs');
      });
  });
});

describe('Get Company details for Admin', () => {
  it('should return all company details for Admin', (done) => {
    agent
      .get('/indeed/api/companies')
      .then((res) => {
        expect(res.body.length).to.not.equal(0);
        done();
      })
      .catch((error) => {
        assert.fail('An error occured. Please check the logs');
      });
  });
});

module.exports = router;
