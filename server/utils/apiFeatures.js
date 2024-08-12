// class APIFeatures {
//     constructor(query, queryString) {
//         this.query = query;
//         this.queryString = queryString;
//     }

//     filter() {
//       const queryObj = { ...this.queryString };
//       const excludedFields = ["page", "sort", "limit", "fields"];
//       excludedFields.forEach((el) => delete queryObj[el]);

//       // Advanced Filtering
//       let queryStr = JSON.stringify(queryObj);
//       queryStr = queryStr.replace(
//           /\b(gte|gt|lte|lt)\b/g,
//           (match) => `$${match}`
//       );

//       // Handle multiple slugs
//       if (queryObj.slug) {
//           const slugs = queryObj.slug.split(","); // Assuming slugs are comma-separated
//           queryObj.$or = slugs.map(slug => ({ slug }));
//           delete queryObj.slug;
//       }

//       this.query = this.query.find(JSON.parse(queryStr));
//       return this;
//   }

//     sort() {
//         if (this.queryString.sort) {
//             const sortBy = this.queryString.sort.split(",").join(" ");
//             this.query = this.query.sort(sortBy);
//         } else {
//             this.query = this.query.sort("ratingQuantity");
//         }
//         return this;
//     }

//     limitField() {
//         if (this.queryString.fields) {
//             const fields = this.queryString.fields.split(",").join(" ");
//             this.query = this.query.select(fields);
//         } else {
//             this.query = this.query.select("-__v");
//         }

//         return this;
//     }

//     paginate() {
//         const page = this.queryString.page * 1 || 1;
//         const limit = this.queryString.limit * 1 || 100;
//         const skip = (page - 1) * limit;

//         this.query = this.query.skip(skip).limit(limit);
//         return this;
//     }
// }

// export default APIFeatures;

class APIFeatures {
  constructor(query, queryString) {
      this.query = query;
      this.queryString = queryString;
      this.pipeline = [];
  }

  filter() {
      const queryObj = { ...this.queryString };
      const excludedFields = ["page", "sort", "limit", "fields"];
      excludedFields.forEach((el) => delete queryObj[el]);

      // Handle multiple slugs
      if (queryObj.slug) {
          const slugs = queryObj.slug.split(","); // Assuming slugs are comma-separated
          const slugRegexArray = slugs.map(slug => ({ slug: { $regex: new RegExp(slug, 'i') } }));
          this.pipeline.push({ $match: { $or: slugRegexArray } });
          delete queryObj.slug;
      }
      // Add other filters
      if (Object.keys(queryObj).length > 0) {
          const queryStr = JSON.stringify(queryObj).replace(
              /\b(gte|gt|lte|lt)\b/g,
              (match) => `$${match}`
          );
          this.pipeline.push({ $match: JSON.parse(queryStr) });
      }


      return this;
  }

  sort() {
      if (this.queryString.sort) {
          const sortBy = this.queryString.sort.split(",").join(" ");
          const sortCriteria = sortBy.split(" ").reduce((acc, field) => {
              const order = field.startsWith("-") ? -1 : 1;
              acc[field.replace("-", "")] = order;
              return acc;
          }, {});
          this.pipeline.push({ $sort: sortCriteria });
      } else {
          this.pipeline.push({ $sort: { ratingsQuantity: 1 } });
      }
      return this;
  }

  limitField() {
      if (this.queryString.fields) {
          const fields = this.queryString.fields.split(",").join(" ");
          const project = fields.split(" ").reduce((acc, field) => {
              acc[field] = 1;
              return acc;
          }, {});
          this.pipeline.push({ $project: project });
      } else {
          this.pipeline.push({ $project: { __v: 0 } });
      }
      return this;
  }

  paginate() {
      const page = this.queryString.page * 1 || 1;
      const limit = this.queryString.limit * 1 || 100;
      const skip = (page - 1) * limit;

      this.pipeline.push({ $skip: skip });
      this.pipeline.push({ $limit: limit });
      return this;
  }

  getPipeline() {
      return this.pipeline;
  }
}

export default APIFeatures;
