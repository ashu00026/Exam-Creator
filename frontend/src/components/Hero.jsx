import { Container, Card, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const Hero = () => {
    return (
      <div className=' py-5'>
        <Container className='d-flex justify-content-center'>
          <Card className='p-5 d-flex flex-column align-items-center hero-card bg-light w-75'>
            <h1 className='text-center mb-4'>Exam Creator</h1>
            <p className='text-center mb-4'>
              This web application allows you to create and manage exams, send exam links to students,
              and check the marks of students who have submitted their exams.
              To get started, simply create an account and log in.
              Once you are logged in, you will be able to create new exams, edit existing exams, and send exam links to students.
            </p>
            <div className='d-flex'>
              <LinkContainer to='/login'>
                  <Button variant='primary' className='me-3'>
                    Sign In
                  </Button>
              </LinkContainer>
    
              <LinkContainer to='/register'>
                  <Button variant='secondary'>
                    Sign Up
                  </Button>
              </LinkContainer>
            </div>
          </Card>
        </Container>
      </div>
    );
};

export default Hero;