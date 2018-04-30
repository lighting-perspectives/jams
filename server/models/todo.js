module.exports = (sequelize, DataTypes) => {
    const Todo = sequelize.define('Todo', {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        filePath: {
            type: DataTypes.STRING,
            allowNull: true,
        }
    }, {});

    Todo.associate = function (models) {
        Todo.hasMany(models.TodoItem, {
            foreignKey: 'todoId',
            as: 'todoItems',
            sourceKey: 'id',
        });
    };

    return Todo;
};