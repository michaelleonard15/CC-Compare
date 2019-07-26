import React from 'react'

class ClassSelector extends React.Component {


  toggleClass(index) {
    this.props.handleToggle(index)
  }

  generateButtons() {
    const courses = this.props.courses.slice()
    let buttons = courses.map( (row, index) => {
    let isSelected = row.isSelected ? 'is-primary' : 'has-background-grey-lighter'
      return(
        <button key={index}
                className={'button is-large ' + isSelected}
                onClick={this.toggleClass.bind(this, index)}
        >
          {row.name}
        </button>
      )
    })
    return buttons
  }

  render() {
    return (
      <div className="columns">
      
        <div className="column is-half is-offset-one-quarter">
          <div className="box has-background-light">
            <h3 className="title has-text-centered"> What classes have you completed at DUMMY DATA? </h3>
  
            <div className="buttons is-centered">
              {this.generateButtons()}
            </div>
          
          
            <div className="level is-mobile">
  
              <div className="level-left">
                <button className="button is-large level-item"
                        onClick={this.props.backButton}>Back</button>
              </div>
                  
              <div className="level-right">
                <button className="button is-large level-item"
                        onClick={this.props.loadNextPage}>Next</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ClassSelector