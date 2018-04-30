module.exports = (sequelize, DataTypes) => {
    const TodoItem = sequelize.define('TodoItem', {
        content: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        complete: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
    }, {});

    TodoItem.associate = function (models) {
        TodoItem.belongsTo(models.Todo, {
            foreignKey: 'todoId',
            targetKey: 'id',
            onDelete: 'CASCADE'
        });
    };

    return TodoItem;
};