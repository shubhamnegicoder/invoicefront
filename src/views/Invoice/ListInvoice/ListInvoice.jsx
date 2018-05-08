import React from "react";
import { Grid } from "material-ui";

import { RegularCard, Table, ItemGrid } from "components";

function TableList({ ...props }) {
    return (
        <Grid container>
            <ItemGrid xs={12} sm={12} md={12}>

                <Table
                    tableHeaderColor="primary"
                    tableHead={["Name", "Country", "City", "Salary"]}
                    tableData={[
                        ["Dakota Rice", "Niger", "Oud-Turnhout", "$36,738"],
                        ["Minerva Hooper", "Curaçao", "Sinaai-Waas", "$23,789"],
                        ["Sage Rodriguez", "Netherlands", "Baileux", "$56,142"],
                        ["Philip Chaney", "Korea, South", "Overland Park", "$38,735"],
                        ["Doris Greene", "Malawi", "Feldkirchen in Kärnten", "$63,542"],
                        ["Mason Porter", "Chile", "Gloucester", "$78,615"]
                    ]}
                    style
                />
            </ItemGrid>
        </Grid>
    );
}

export default TableList;