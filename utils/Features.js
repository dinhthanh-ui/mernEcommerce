class Features
{
	constructor (query, queryStr)
	{
		this.query = query;
		this.queryStr = queryStr;
	}

	search ()
	{
		const keyword = this.queryStr.keyword ?
			{
				name: {
					$regex: this.queryStr.keyword,
					$options: "i"
				}
			} : {}
		this.query = this.query.find({ ...keyword });
		return this;
	}

	filter ()
	{
		const queryCopy = { ...this.queryStr };

		// removing some fields for category: xóa một số trường cho danh mục
		const removeFields = ["keyword", "page", "limit"];
		removeFields.forEach((key) =>
		{
			delete queryCopy[key];
		})
		this.query = this.query.find(queryCopy);
		return this;
	}
	pagination (resultPage)
	{
		const currentPage = Number(this.queryStr.page) || 1;
		const skip = resultPage * (currentPage - 1);

		this.query = this.query.limit(resultPage).skip(skip);
		return this;
	}
}
module.exports = Features;