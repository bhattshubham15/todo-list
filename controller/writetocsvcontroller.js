const writeCSVModel = require("../model/writetocsv");
const Json2csvParser = require("json2csv").Parser;
const fs = require("fs");

exports.write = function (req, res) {
    /**
     * #swagger.tags = ['Write to csv']
     * #swagger.description = 'Api to create csv',
     * #swagger.responses[200] = { description: 'Todo created!' }
     * #swagger.responses[500] = { description: 'Server error' }
    */
    writeCSVModel.write(req.body, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({
                success: 0,
                message: "Database connection error"
            })
        }
        if (result.length > 0) {
            const jsonData = JSON.parse(JSON.stringify(result));
            const json2csvParser = new Json2csvParser({ header: true });
            const csv = json2csvParser.parse(jsonData);
            fs.writeFile("/home/shubham.batt/Downloads/user_details_data_todo.csv", csv, function (error) {
                if (error) throw error;
                console.log("Write to user_details_data_todos.csv successfully!");
            });
            return res.status(200).json({
                success: 1,
                message: 'CSV created!'
            });
        }
        return res.status(500).json({
            success: 0,
            message: 'No data found!'
        });
    })
}
