import React, { Component } from 'react'

 class Pagination extends Component {
       state = {
             isEditable: false
       }
  render() {
        const {isPrevious, isNext, next, prev, currentPage, totalPage, handlePageChange, goToPage} = this.props;
    return (
      <div className = 'd-flex my-5 align-items-center'>
            <button className ='btn btn-warning' disabled = {!isPrevious} onClick = {() =>{
                  prev()
            }}>Previous</button>
                  <div className ='flex-grow-1 text-center'>
                        {this.state.isEditable ? (
                              <input 
                                    type = 'number' 
                                    value = {currentPage} 
                                    onChange = {(e) => handlePageChange(e.target.value)}
                                    onKeyPress = {(e)=> {
                                          if(e.key === 'Enter'){
                                                goToPage();
                                                this.setState({isEditable: false});
                                          }
                                    }}
                              />
                        ):(
                              <p style = {{userSelect: 'none', lineHieght: '1.1'}}
                              title = 'Double Tap to Jump Page'
                              onDoubleClick = {() => {
                                    this.setState({isEditable: !this.state.isEditable})
                              }}
                              >
                                    {currentPage} of {totalPage}
                                    <br />
                                    <small>Double tap to Edit</small>
                              </p>
                        )}
                  </div>
            <button className ='btn btn-warning ml-auto' disabled = {!isNext} onClick ={()=>{
                  next()
            }} >Next</button>
      </div>
    )
  }
}

export default Pagination;