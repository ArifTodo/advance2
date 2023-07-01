import React, { Component } from 'react'
import News, { newsCategory } from '../../news';
import Header from './header';
import NewsList from './news-list';
import Pagination from '../advance/pagination'
import Loading from '../advance/loading';

const news = new News(newsCategory.technology)
 class App extends Component {
       state = {
            data: {},
            isLoading: true
       }
       
       componentDidMount(){
            news.getNews()
                  .then(data => {
                        this.setState({data, isLoading: false})
                  })
                  .catch(e => {
                        console.log(e)
                        alert('Somethig went wrong')
                        this.setState({isLoading: false})
                  })
       };

       next = () => {
             if(this.state.data.isNext){
                   this.setState({isLoading: true})
             }
             news.next()
                        .then(data => {
                              this.setState({data, isLoading: false})
                        })
                        .catch(e => {
                              console.log(e)
                              alert('Somethig went wrong')
                              this.setState({isLoading: false})
                        })
       }

       prev = () => {
            if(this.state.data.isPrevious){
                  this.setState({isLoading: true})
            }
            news.prev()
                 .then(data => {
                       this.setState({data, isLoading: false})
                 })
                 .catch(e => {
                       console.log(e)
                       alert('Somethig Went Wrong')
                       this.setState({isLoading: false})
                 })
      };

      handlePageChange = value => {
            this.setState({
                  data:{
                        ...this.state.data,
                        currentPage: Number.parseInt(value)
                  }
            })
      };

      changeCategory = (category) => {
            this.setState({isLoading: true});
            news.changeCategory(category)
                  .then(data =>{
                        this.setState({data, isLoading: false})
                  })
                  .catch(e =>{
                        console.log(e)
                        alert('Something Went Wrong')
                        this.setState({isLoading: false})
                  })
      };

      newSearch = (searchTem) => {
            this.setState({isLoading: true})
            news.newSearch(searchTem)
                  .then(data =>{
                        this.setState({data, isLoading: false})
                  })
                  .catch(e =>{
                        console.log(e)
                        alert('Something Went Wrong')
                        this.setState({isLoading: false})
                  })
      };

      goToPage = () =>{
            this.setState({isLoading: true})
            news.setCurrentPage(this.state.data.currentPage)
                  .then(data => {
                        this.setState({data, isLoading: false})
                  })
                  .catch(e => {
                        console.log(e)
                        alert('Somethig Went Wrong')
                        this.setState({isLoading: false})
                  })
      };

  render() {
        const { isNext, isPrevious, totalPage, currentPage, category, totalResults} = this.state.data
    return (
      <div className = 'container'>
            <div className ='row'>
                  <div className = 'col-sm-6 offset-md-3'>
                       <Header 
                              category = {category} 
                              changeCategory = {this.changeCategory}
                              newSearch = {this.newSearch} 
                        />
                       <div className ='d-flex'>
                              <p className = 'text-black-50'>
                                   About {totalResults} result found
                              </p>
                              <p className ='text-black-50 ms-auto'>
                                    {currentPage} page of {totalPage}
                              </p>
                       </div>
                       {this.state.isLoading ? (
                              <Loading />
                       ): (
                              <div>
                                    <NewsList news={this.state.data.article} />
                                    <Pagination 
                                          next = {this.next}
                                          prev = {this.prev}
                                          isPrevious = {isPrevious}
                                          isNext = {isNext}
                                          totalPage = {totalPage}
                                          currentPage = {currentPage}
                                          handlePageChange = {this.handlePageChange}
                                          goToPage = {this.goToPage}
                                    />
                              </div>
                       )}
                  </div>
            </div>
      </div>
    )
  }
}

export default App;