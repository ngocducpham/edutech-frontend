import React, {Component} from 'react';

import { commonQuestionTypes } from "../../constants/masterData";

class BaseQuestion extends Component {

    handleComponent = () => {
        const { type } = this.props;
        let QComponent = commonQuestionTypes.find(c=>{
            if(c.value === type)return true;
            return false;
        });
        QComponent = QComponent ? QComponent.Component : <div></div>;
        return (<div className="question-component">
                <QComponent {...this.props}/>
        </div>)
    }
    render() {
        return (
            this.handleComponent()
        );
    }
}

export default BaseQuestion;
