<table>
    <thead onClick={this.handleSort}>
    <tr>
        {
            this.props.headers.map(function(header,idx){
                var temp = "";
                if(this.state.sortIdx == idx){
                    temp += this.state.descending ? ' \u2191' : ' \u2193';
                }
                return <th key={idx}>{header}{temp}</th>;
            },this)
        }
    </tr>
    </thead>
    <tbody>
    {
        this.state.data.map(function(row,idx){
            if(this.state.category != row.category){
                return;
            }
            return(
                <tr key={idx}>
                    <td>{row.title}</td>
                    <td>{row.author}</td>
                    <td>{"$"}{row.price}</td>
                    <td>{row.publish}</td>
                    <td>
                        <Button type="primary" onClick={this.addItem} data-row={idx}>
                            <Icon type="plus" />Add</Button>
                        <Button type="primary" onClick={this.display} data-row={idx}>
                            <Icon type="right" /></Button>
                    </td>
                </tr>
            );
        },this)
    }
    </tbody>
</table>