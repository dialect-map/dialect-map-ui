/* encoding: utf-8 */

import { Component } from "react";
import { Header, Image, Modal, Segment } from "semantic-ui-react";
import Logo from "../../../images/DS3_logo.png";

export default class PapersModal extends Component {
    /** Component defining the center overlaid box upon information request */

    render() {
        return (
            <Modal
                trigger={
                    <Segment basic className="papers-header-info">
                        Info
                    </Segment>
                }
            >
                <Modal.Header>Dialect Map</Modal.Header>

                <Modal.Content image>
                    <Image wrapped size="medium" src={Logo} />
                    <Modal.Description>
                        <Header>Project description</Header>
                        <p>
                            <i>Dialect Map</i> is a project initially supported by the NYU
                            Data Science and Software Services initiative
                            <a
                                href="https://cds.nyu.edu/ds3/"
                                rel="noopener noreferrer"
                                target="_blank"
                            >
                                {" (DS3)"}
                            </a>
                            , that compares jargon areas of influence across multiple
                            science domains. For visualization purposes, it uses the
                            representation of ArXiv stored papers provided by the
                            PaperScape project.
                        </p>
                        <p>
                            This web client has been created with the help of
                            <a
                                href="https://robjk.net/"
                                rel="noopener noreferrer"
                                target="_blank"
                            >
                                {" Rob J. Knegjens"}
                            </a>
                            , one of the original PaperScape authors.
                        </p>
                    </Modal.Description>
                </Modal.Content>
            </Modal>
        );
    }
}
