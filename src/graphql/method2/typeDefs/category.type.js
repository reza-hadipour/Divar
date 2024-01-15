
const categoryTypeDefs = `
    type Category {
        _id: String,
        name: String,
        slug: String,
        icon: String,
        parent: Category,
        parents: [Category],
        children: [Category]
    }
`;

module.exports = { categoryTypeDefs };

