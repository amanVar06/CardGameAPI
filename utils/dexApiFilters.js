class DexAPIFilters {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  sort() {
    if (this.queryStr.sortBy) {
      const sortBy = this.queryStr.sortBy;
      console.log(sortBy);
      this.query = this.query.sort({ [sortBy]: -1 });
    } else {
      this.query = this.query.sort({ characterId: 1 });
    }

    return this;
  }

  searchByName() {
    if (this.queryStr.q) {
      const qu = this.queryStr.q;
      //   console.log(qu);

      const regex = new RegExp(`\\b${qu}\\b`, "i");
      console.log(regex);

      this.query = this.query.find({ name: regex });
    }

    return this;
  }

  searchBySeries() {
    if (this.queryStr.series) {
      const series = this.queryStr.series;
      // console.log(series);

      const regex = new RegExp(series, "i");
      // console.log(regex);

      this.query = this.query.find({ animeSeries: regex });
    }
  }

  searchByTalent() {
    if (this.queryStr.talent) {
      const talent = this.queryStr.talent;
      // console.log(talent);

      const regex = new RegExp(talent, "i");
      // console.log(regex);

      this.query = this.query.find({ talent: regex });
    }
  }

  searchByType() {
    if (this.queryStr.type) {
      const type = this.queryStr.type;
      // console.log(type);

      const regex = new RegExp(type, "i");
      // console.log(regex);

      this.query = this.query.find({ type: regex });
    }
  }

  pagination() {
    //?limit=20&page=5 i.e. 20 entries per page and 5th page
    // using base 10
    const page = parseInt(this.queryStr.page, 10) || 1;
    const limit = parseInt(this.queryStr.limit, 10) || 0;

    //default page is one and limit will be 10
    const skipResults = (page - 1) * limit;

    this.query = this.query.skip(skipResults).limit(limit);
    return this;
  }
}

module.exports = DexAPIFilters;
