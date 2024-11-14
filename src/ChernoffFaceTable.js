import { useState } from "react";
import Nose from "./Components/ChernoffFaceElement/Nose";
import Ears from "./Components/ChernoffFaceElement/Ears";
import Mouth from "./Components/ChernoffFaceElement/Mouth";
import Eyes from "./Components/ChernoffFaceElement/Eyes";
import Eyebrows from "./Components/ChernoffFaceElement/Eyebrows";
import FaceComponentProvider from "./Components/ChernoffFaceElement/FaceComponentProvider";
import './App.css'
function ChernoffFaceTable({ quartilesGlobal }) {

  return (
    <div className="flex-container">
      <table style={{tableLayout:"auto",width:"auto"}}>
        <thead>
          <tr>
            <th>{quartilesGlobal[0]?quartilesGlobal[0]?.column:"-"}</th>
            <th>Zakres</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <FaceComponentProvider xSize={80} ySize={50}>
                <Eyebrows size={1} />
              </FaceComponentProvider>
            </td>
            <td>
              {quartilesGlobal[0]?.min}-{quartilesGlobal[0]?.Q33}
            </td>
          </tr>
          <tr>
            <td>
              <FaceComponentProvider xSize={80} ySize={50}>
                <Eyebrows size={2} />
              </FaceComponentProvider>
            </td>
            <td>
              {quartilesGlobal[0]?.Q33}-{quartilesGlobal[0]?.Q66}
            </td>
          </tr>
          <tr>
            <td>
              <FaceComponentProvider xSize={80} ySize={50}>
                <Eyebrows size={3} />
              </FaceComponentProvider>
            </td>
            <td>
              {quartilesGlobal[0]?.Q66}-{quartilesGlobal[0]?.max}
            </td>
          </tr>
        </tbody>
      </table>

      <table>
        <thead>
          <tr>
            <th>{quartilesGlobal[1]?quartilesGlobal[1]?.column:"-"}</th>
            <th>Zakres</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
            <FaceComponentProvider xSize={80} ySize={30}>
              <Eyes size={1} posX1={20} posX2={60} posY1={15} posY2={15}/>
              </FaceComponentProvider>
            </td>
            <td>
              {quartilesGlobal[1]?.min}-{quartilesGlobal[1]?.Q33}
            </td>
          </tr>
          <tr>
            <td>
            <FaceComponentProvider xSize={80} ySize={30}>
              <Eyes size={2} posX1={20} posX2={60} posY1={15} posY2={15}/>
              </FaceComponentProvider>
            </td>
            <td>
              {quartilesGlobal[1]?.Q33}-{quartilesGlobal[1]?.Q66}
            </td>
          </tr>
          <tr>
            <td>
            <FaceComponentProvider xSize={80} ySize={30}>
              <Eyes size={3} posX1={20} posX2={60} posY1={15} posY2={15}/>
              </FaceComponentProvider>
            </td>
            <td>
              {quartilesGlobal[1]?.Q66}-{quartilesGlobal[1]?.max}
            </td>
          </tr>
        </tbody>
      </table>

      <table>
        <thead>
          <tr>
            <th>{quartilesGlobal[2]?quartilesGlobal[2]?.column:"-"}</th>
            <th>Zakres</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
            <FaceComponentProvider xSize={80} ySize={30}>
              <Ears size={1} posX1={20} posX2={60} posY1={15} posY2={15}/>
              </FaceComponentProvider>
            </td>
            <td>
              {quartilesGlobal[2]?.min}-{quartilesGlobal[2]?.Q33}
            </td>
          </tr>
          <tr>
            <td>
            <FaceComponentProvider xSize={80} ySize={30}>
              <Ears size={2} posX1={20} posX2={60} posY1={15} posY2={15}/>
              </FaceComponentProvider>
            </td>
            <td>
              {quartilesGlobal[2]?.Q33}-{quartilesGlobal[2]?.Q66}
            </td>
          </tr>
          <tr>
            <td>
            <FaceComponentProvider xSize={80} ySize={30}>
              <Ears size={3} posX1={20} posX2={60} posY1={15} posY2={15}/>
              </FaceComponentProvider>
            </td>
            <td>
              {quartilesGlobal[2]?.Q66}-{quartilesGlobal[2]?.max}
            </td>
          </tr>
        </tbody>
      </table>

      <table>
        <thead>
          <tr>
            <th>{quartilesGlobal[3]?quartilesGlobal[3]?.column:"-"}</th>
            <th>Zakres</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
            <FaceComponentProvider xSize={80} ySize={30}>
              <Nose size={1} posX={40} posY={15}/>
              </FaceComponentProvider>
            </td>
            <td>
              {quartilesGlobal[3]?.min}-{quartilesGlobal[3]?.Q33}
            </td>
          </tr>
          <tr>
            <td>
            <FaceComponentProvider xSize={80} ySize={30}>
              <Nose size={2} posX={40} posY={15}/>
              </FaceComponentProvider>
            </td>
            <td>
              {quartilesGlobal[3]?.Q33}-{quartilesGlobal[3]?.Q66}
            </td>
          </tr>
          <tr>
            <td>
            <FaceComponentProvider xSize={80} ySize={30}>
              <Nose size={3} posX={40} posY={15}/>
              </FaceComponentProvider>
            </td>
            <td>
              {quartilesGlobal[3]?.Q66}-{quartilesGlobal[3]?.max}
            </td>
          </tr>
        </tbody>
      </table>

      <table>
        <thead>
          <tr>
            <th>{quartilesGlobal[4]?quartilesGlobal[4]?.column:"-"}</th>
            <th>Zakres</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
            <FaceComponentProvider xSize={80} ySize={30}>
              <Mouth size={1} posX={40} posY={15}/>
              </FaceComponentProvider>
            </td>
            <td>
              {quartilesGlobal[4]?.min}-{quartilesGlobal[4]?.Q33}
            </td>
          </tr>
          <tr>
            <td>
              <FaceComponentProvider xSize={80} ySize={30}>
              <Mouth size={2} />
              </FaceComponentProvider>
            </td>
            <td>
              {quartilesGlobal[4]?.Q33}-{quartilesGlobal[4]?.Q66}
            </td>
          </tr>
          <tr>
            <td>
            <FaceComponentProvider xSize={80} ySize={30}>
              <Mouth size={3} />
              </FaceComponentProvider>
            </td>
            <td>
              {quartilesGlobal[4]?.Q66}-{quartilesGlobal[4]?.max}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
export default ChernoffFaceTable;
