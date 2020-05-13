module.exports = function(models) {
    models.users.belongsToMany(models.events, 
        { 
            through: models.events,
            foreignKey: 'Id'
        });
    models.events.belongsToOne(models.users,
        {
            through: models.users,
            foreignKey: 'UserId'
        });
}