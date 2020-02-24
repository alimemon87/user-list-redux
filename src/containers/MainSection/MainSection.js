import React from 'react';
import {connect} from 'react-redux';
import * as actionCreators from '../../store/actions/actions';
import axios from "axios";
import UserList from '../../components/UserList/UserList';
import {Alert} from 'react-bootstrap';
//import * as actionTypes from '../../store/actions/actions';

class MainSection extends React.Component {
  
    constructor(props) {
        super(props);
        this.state = {
            //loading:false,
            //users: [],
            //per: 8,
            //page: 1,
            //totalPages: null,
            //scrolling: false,
            //endOfRecords: false
        }
        this.loadMore = this.loadMore.bind(this);
        this.handleScroll = this.handleScroll.bind(this);
    }
  
    componentDidMount() {
        this.loadUsers();
        this.scrollListener = window.addEventListener('scroll', (e) => {
            this.handleScroll(e)
        })
    }
  
    loadUsers(){
        /*this.setState({
            loading: true
        });*/
        //const {per,page,users} = this.state;
        /*const url = `https://reqres.in/api/users?per_page=${per}&page=${page}`
        axios
            .get(url)
            .then(response => {
            this.successShow(response,users);
            })
            .catch(error => {
            this.successShow(error,users);
            });*/
            this.props.onUserStoreResult();
            this.props.onScroll(false);
    }

    successShow(response,users) {
        //this.setState({
            //loading: false,
            //scrolling: false,
            //totalPages: response.data.total_pages,
            //users: [...users, response.data.data]
        //});
        this.props.onScroll(false)

    }
  
    loadMore(){
        /*this.setState(prevState => ({
            page: prevState.page + 1,
            scrolling: true,
        }),this.loadUsers)*/
        //console.log('loadmore');
        this.props.onScroll(true);
        if(this.props.totalPage > this.props.page && this.props.scroll){
            this.loadUsers();
        }else{
            this.props.onEndOfRecord();
        }
    }

    handleScroll(e){
        const {scrolling,totalPages,page} = this.state;
        if(this.props.scroll) return
        if(this.props.totalPages < this.props.page) {
            this.props.onEndOfRecord();
            return
        }
        const lastLi = document.querySelector('.user_list > li:last-child');
        const lastLiOffset = lastLi.offsetTop + lastLi.clientHeight;
        const pageOffset = window.pageYOffset + window.innerHeight;
        let bottomOffset = 20;
        if(pageOffset > lastLiOffset - bottomOffset) this.loadMore();
    }


  render(){
    return (
        <section>
            <h2>User List</h2>
            {
                (this.state.loading) ? <p>Loading...</p>
                : <UserList users={this.props.storedUsers} />
            }
            {
                (this.props.eor) ? 
                    <Alert variant={"info"}>
                        <h6 className='text-center'>Nothing to display.</h6>
                    </Alert>
                : null
            }

        </section>
    );
  }
}

const mapStateToProps = state => {
    console.log(state);
    return {
        eor : state.endOfRecords,
        storedUsers: state.users,
        totalPage: state.totalPages,
        page:state.page,
        scroll: state.scrolling
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onEndOfRecord: () => dispatch(actionCreators.endOfRecord()),
        onUserStoreResult: () => dispatch(actionCreators.usersStoreResult()),
        onScroll: (flag) => dispatch(actionCreators.scrolling(flag))
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(MainSection);
