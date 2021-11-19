const Reviews = require('../../model/Reviews');
const redisCli = require('../../redis/Connection');

async function handleRequest(req, callback) {
  const { companyId } = req.params;
  const { url } = req;
  redisCli.get(url, async (err, data) => {
    if (err) callback(err, null);
    if (data !== null) {
      console.log('redis hit');
      callback(null, JSON.parse(data));
    } else {
      const reviews = await Reviews.find({ companyId }, { comment: 1 });
      console.log('mongo hit');
      if (reviews) {
        redisCli.setex(url, 3600, JSON.stringify(reviews));
      }
      callback(null, reviews);
    }
  });
}

exports.handle_request = handleRequest;
