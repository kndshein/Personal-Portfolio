import React from "react";
import { graphql } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";

import Layout from "../components/layout";
import SEO from "../components/seo";
import Modal from "../components/modal";

const CodePage = ({ data }) => {
  const [showModal, setShowModal] = React.useState(false);
  const [modalCard, setModalCard] = React.useState();

  const handleModal = (index) => {
    if (showModal) {
      setShowModal(false);
    } else {
      setShowModal(true);
      setModalCard(data.projects.edges[index].node);
    }
  };

  return (
    <>
      <Modal
        cardData={modalCard}
        showModal={showModal}
        handleModal={handleModal}
      />
      <Layout>
        <SEO title="I Code" />
        <div className="code-page">
          <div className="cards-container">
            {data.projects.edges.map((project, index) => {
              return (
                <div
                  className="card-container"
                  key={index}
                  onClick={() => handleModal(index)}
                >
                  <div className="card-title">{project.node.title}</div>
                  <div className="card-image">
                    <GatsbyImage
                      className="image"
                      image={project.node.image.gatsbyImageData}
                      alt={project.node.image.description}
                    />
                  </div>
                  {/* <div className="card-overlay">{project.node.description}</div> */}
                </div>
              );
            })}
          </div>
        </div>
      </Layout>
    </>
  );
};

export default CodePage;

export const pageQuery = graphql`
  query {
    projects: allContentfulCodeGallery {
      edges {
        node {
          title
          image {
            gatsbyImageData
            description
          }
          preview {
            file {
              url
            }
          }
          description
          features: childContentfulCodeGalleryFeaturesJsonNode {
            Features
          }
          links: childContentfulCodeGalleryLinkJsonNode {
            GitHub
            Livelink
          }
          technologies: childContentfulCodeGalleryTechnologiesJsonNode {
            Technologies
          }
        }
      }
    }
  }
`;