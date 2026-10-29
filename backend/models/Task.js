const mongoos = require("mongoose")

const taskSchema = new mongoos.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        completed:{
            type: Boolean,
            default: false,
        },  
    },
    { timestamps: true }
);
module.exports = mongoos.model("Task",taskSchema);