import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
} from "mdb-react-ui-kit";

import { Button } from "react-bootstrap";

export const WinnerPopUp = ({ typeName, simulationFinished, toggleShow }) => {
  return (
    <MDBModal show={simulationFinished} tabIndex="-1">
      <MDBModalDialog>
        <MDBModalContent>
          <MDBModalHeader>
            <MDBModalTitle
              style={{ color: "rgba(0, 99, 132, 0.5)", fontWeight: "bold" }}
            >
              Simulation ended...
            </MDBModalTitle>
            <MDBBtn
              className="btn-close"
              color="none"
              onClick={toggleShow}
            ></MDBBtn>
          </MDBModalHeader>
          <MDBModalBody>
            <h1>{typeName} won !</h1>
          </MDBModalBody>

          <MDBModalFooter>
            <Button
              style={{
                backgroundColor: "rgba(202, 42, 64, 0.692",
                borderColor: "rgba(202, 42, 64, 0.692",
                fontWeight: "bold",
              }}
              onClick={toggleShow}
            >
              Close
            </Button>
          </MDBModalFooter>
        </MDBModalContent>
      </MDBModalDialog>
    </MDBModal>
  );
};
