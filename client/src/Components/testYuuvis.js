import React, { Component } from 'react';

class testYuuvis extends Component {
    state = {  }

    async searchDocuments() {
        // console.log("clicked the button");
        const result = await fetch('/api/yuuvis/search');
        // console.log(JSON.stringify(data));
        const data = await result.json();
        console.log(data);
    }

    render() { 
        return (
            <div>
                <button
                onClick={this.searchDocuments}
                >
                    Submit
                </button>

                {/* <label>Metadata: </label>
                <input type="file" value="metadata" /><br />
                <label>Content: </label>
                <input type="file" value="contentdata" /><br />
                <input type="button" onclick="upload" value="Test" /> */}
            </div>
        );
    }
}
 
export default testYuuvis;