import { Navbar, Nav, Container, NavDropdown, Badge } from 'react-bootstrap';
import { FaSignInAlt, FaSignOutAlt, FaUserAlt, FaBook, FaPenAlt } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import {LinkContainer} from 'react-router-bootstrap';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { logout } from '../slices/authSlice';
import { useNavigate } from 'react-router-dom';


const Header = () => {

  const {userInfo} = useSelector((state)=>state.auth);
  const dispatch=useDispatch();

  const [logoutApiCall]=useLogoutMutation();
  const navigate=useNavigate();

  const logoutHandler = async()=>{
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate('/')    
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <header>
      <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect id="navbar">
        <Container>
          {/* <Navbar.Brand href='/'>MERN Auth</Navbar.Brand> */}

          {/* using this will not reload the page while directing to a new path */}
          <LinkContainer to='/'>
            <Navbar.Brand href='/'>{userInfo?`Welcome ${userInfo.name}`:`Exam Creator`}</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ms-auto'>
              {
              userInfo
              ? 
              (
                <>
                <LinkContainer to='/dashboard'>
                    <Nav.Link>
                        <FaPenAlt /> Question Paper
                    </Nav.Link>
                  </LinkContainer>
                  <LinkContainer to='/submission'>
                    <Nav.Link>
                        <FaBook /> Submissions
                    </Nav.Link>
                  </LinkContainer>
                  <LinkContainer to='/profile'>
                    <Nav.Link>
                        <FaUserAlt /> Profile
                    </Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/">
                    <Nav.Link onClick={logoutHandler}>
                        <FaSignOutAlt /> Logout
                    </Nav.Link>
                  </LinkContainer>
                </>
              )
              : 
              (
                <>
                <LinkContainer to='/login'>
                    <Nav.Link>
                        <FaSignInAlt /> Sign In
                    </Nav.Link>
                </LinkContainer>

                <LinkContainer to='/register'>
                    <Nav.Link>
                        <FaSignInAlt /> Sign Up
                    </Nav.Link>
                </LinkContainer>
                </>
              )
              }
                
                
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;