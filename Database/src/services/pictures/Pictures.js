/* eslint max-len: 0 */
const Picture = require('../../model/Picture');

// function addPictures(pictures) {
//     const createArray = [];
//     const updateArray = [];

//     pictures.forEach(picture => {
//         if ([undefined, null, ''].includes(picture.pictureId)) {
//             createArray.push(picture);
//         } else {
//             updateArray.push(picture);
//         }
//     });

//     return new Promise(async (resolve, reject) => {
//         try {
//             const response = await Promise.all([Picture.create(createArray), Picture.bulkWrite(updateArray.map(picture => ({
//                 updateOne: {
//                     filter: { pictureId: picture.pictureId },
//                     update: picture,
//                 }
//             })))])
//             resolve([...response[0], ...updateArray]);
//         } catch (error) {
//             reject(error);
//         }
//     })
// }

function addPictures(pictures) {
  return Picture.create(pictures);
}

function setApproval(pictures) {
  return Picture.bulkWrite(
    pictures.map((picture) => ({
      updateOne: {
        filter: { _id: picture._id },
        update: { isApproved: picture.isApproved },
      },
    })),
  );
}

module.exports = {
  addPictures,
  setApproval,
};
