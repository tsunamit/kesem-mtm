import React from 'react';
import '../../styles/defaultStyles.css';
import './styles/AboutPageStyles.css';
import FooterContainter from '../containers/FooterContainer'
import FadeIn from 'react-fade-in';

import pic_1 from '../../images/kesem-4.jpg'; 
import pic_2 from '../../images/kesem-mtm-2.jpg'; 

const WHAT_IS_CAMP_KESEM_PARAGRAPH = ''
function AboutPage() {
  return (
    <FadeIn delay = '500' transitionDuration = '2000' >
      <div id = 'horizontal-wrapper'> 
        <div id = 'text-wrapper'> 
            <div id = 'text-h1'> 
                What is Camp Kesem? 
            </div> 
            <div id = 'text-p'> 
                Camp Kesem is a nationwide non-profit that supports children through and beyond a parent’s cancer, primarily by hosting free, week-long summer camps. All Camp Kesem chapters are lead by student volunteers who plan, organize, and host Friends and Family Days, fundraisers, counselor trainings, and a week of summer camp. This year, we are excited to announce a transition to <b>Kesem at Home</b>, in which we will engage our campers remotely. 
                <br></br> <br></br>
                Here at Camp Kesem at UCLA, we are proud to serve over 260 children from the Greater Los Angeles Area. 
                For more information on Camp Kesem at UCLA, please visit our <b> <a id = 'link-style' target= '_blank' href="https://www.campkesem.org/find-a-camp/camp-kesem-at-ucla">website</a></b>.
            </div>
        </div> 
        <img id = 'image-wrapper' src = {pic_1}>
        </img>
      </div> 

      <div id = 'horizontal-wrapper'> 
        <img id = 'image-wrapper' src = {pic_2}>
        </img>
        <div id = 'text-wrapper'> 
            <div id = 'text-h1'> 
                What is Make the Magic? 
            </div> 
            <div id = 'text-p'> 
                Make the Magic is our annual fundraiser in which we raise funds to support our campers throughout the year. Unfortunately, this year we had to cancel our in-person fundraiser. However, we are excited to host our first ever Virtual Make the Magic! 
                <br></br> <br></br>
                Please tune in on Facebook Live on Saturday, May 9th, from 6-7pm PST to attend our Virtual Make the Magic! 
                <br></br> <br></br>
                If you are unable to attend the livestream but still wish to donate, you can donate at this
                 <b> <a id = 'link-style' target= '_blank' href="https://donate.kesem.org/UCLAmtm2020">link</a></b>. 
            </div>
        </div> 
      </div> 
      <div id = "footer"/>
      <FooterContainter></FooterContainter>
    </FadeIn> 
  );
}

export default AboutPage;
