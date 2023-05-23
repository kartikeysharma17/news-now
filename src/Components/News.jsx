import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'


export class News extends Component {
    static defaultProps = {
        country: 'in',
        pageSize:8,
        category:'general'
      }
      static propTypes = {
        country: PropTypes.string,
        pageSize:PropTypes.number,
        category:PropTypes.string,
      }



    constructor() {
        super();
        this.state = {
            page: 1,
            articles: [],
            loading: false
        }
    }
    async componentDidMount() {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=0db422eeac5649a2958ae9f5634c2d9f&page=1pageSize=20`;
        this.setState({ loading: true });
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({ articles: parsedData.articles, totalResults: parsedData.totalResults, loading:false })
    }
    handlePreviousClick = async () => {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=0db422eeac5649a2958ae9f5634c2d9f&page=${this.state.page - 1}&pageSize=20`;
        this.setState({ loading: true });
        let data = await fetch(url);
        let parsedData = await data.json()


        this.setState({
            page: this.state.page - 1,
            articles: parsedData.articles,
            loading: false
        })

    }
    handleNextClick = async () => {
        console.log("Next");
        if (this.state.page + 1 > Math.ceil(this.state.totalResults / 20)) {

        }
        else {


            let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=0db422eeac5649a2958ae9f5634c2d9f&page=${this.state.page + 1}&pageSize=20`;
            this.setState({ loading: true });

            let data = await fetch(url);
            
            let parsedData = await data.json()
            this.setState({
                page: this.state.page + 1,
                articles: parsedData.articles,
                loading: false
            })
        }

    }

    render() {
        return (
            <div className="container my-3" >
                <h1 className="text-center" style={{margin:'35px 0px'}}  >NewsNow-Top Headlines</h1>
                {this.state.loading && <Spinner />}
                <div className="row" >
                    {this.state.articles?.map((element) => {
                        return <div className="col-md-4" key={element.url}>
                            <NewsItem title={element.title} description={element.description} imageUrl={element.urlToImage} newsUrl={element.url} />
                        </div>
                    })}
                    <div className="container d-flex justify-content-between">
                        <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePreviousClick}>&laquo; Previous</button>
                        <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / 20)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &raquo;</button>




                    </div>

                </div>
            </div>
        )
    }
}

export default News
