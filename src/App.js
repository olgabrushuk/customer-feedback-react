import React from 'react';
import Comments from './Comments';
import StarRatingComponent from 'react-star-rating-component';
import LineChart from './LineChart';

class CustomerFeedback extends React.Component {
  constructor(props) {
    super(props);
    this.state = { // set default states
      comments: [],
      formControls: {
          email: {
            value: ''
          },
          userName: {
            value: ''
          },
          comment: {
            value: ''
          }
      },
      rating: 1,
      chartDataHeaders: ["Comment index", "Rating"],
      chartData: []
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  changeHandler = event => {
      
      const name = event.target.name;
      const value = event.target.value;
    
      this.setState({
        formControls: {
            ...this.state.formControls,
            [name]: {
            ...this.state.formControls[name],
            value
          }
        }
      });
  }

  handleSubmit(event) {
    event.preventDefault(); // stop form from submitting and do actions below

    // create an array that contains comments data: comment, name(user) and rating
    const comments = [...this.state.comments, {
        comment: this.state.formControls.comment.value, 
        name: this.state.formControls.userName.value, 
        rating: this.state.rating
    }]

    // create a new array that consists of chart header and push in indexed ratings
    const allRatingsIndexed = [this.state.chartDataHeaders];
    comments.forEach((comment, index) => allRatingsIndexed.push([index + 1, comment.rating]));
    
    // set new states on submit
    this.setState({
      comments: comments,
      formControls: {
          email: {
            value: ''
          },
          userName: {
            value: ''
          },
          comment: {
            value: ''
          }
      },
      chartData: allRatingsIndexed,
      rating: 1
    });
  }

  // handle star click
  onStarClick(nextValue, prevValue, name) {
    this.setState({rating: nextValue});
  }

  render() {

    // render Chart only if it has rating data
    let chart = '';

    if (this.state.chartData.length > 1) { // length needs to be higher than 1 as the 1st value is the headings array 
      chart = <LineChart chartData={this.state.chartData}/>;
    }

    // render Comments section only if at least one comment was added
    let commentsSection = '';

    if (this.state.comments.length >= 1) {
      commentsSection = 
        <div className="comments">
          <h2 className="below-16">Latest comments:</h2>
          <Comments items={this.state.comments} />
        </div>;
    }

    return (
      <div className="slab">
        <div className="container">
          <h1 className="below-16">Customer feedback</h1>
          <div className="row">
            <div className="col-md-7">
              <form onSubmit={this.handleSubmit}>      
                <label htmlFor="userName" className="hidden">Enter your email</label>
                <input type="text" name="userName" value={this.state.formControls.userName.value} onChange={this.changeHandler} placeholder="Enter your name" required />                
                
                <label htmlFor="email" className="hidden">Enter your name</label>
                <input type="email" name="email" value={this.state.formControls.email.value} onChange={this.changeHandler} placeholder="Enter your email" required />                
                
                <div className="below-16 top-24">
                  <h2 className="mega">Please include your rating:</h2>
                  <StarRatingComponent 
                    name="rate1" 
                    starCount={5}
                    value={this.state.rating}
                    onStarClick={this.onStarClick.bind(this)}
                  />
                </div>
                
                <label htmlFor="comment" className="hidden">Enter your comment</label>
                <textarea name="comment" value={this.state.formControls.comment.value} onChange={this.changeHandler} placeholder="Please leave your comment" required />
                
                <input type="submit" value="Submit" />
              </form>
            </div>
            <div className="col-md-5">
              {chart}
            </div>
          </div>
          {commentsSection}
        </div>
      </div>
    );
  }
}

function App() {
  return (
    <CustomerFeedback />
  );
}

export default App;