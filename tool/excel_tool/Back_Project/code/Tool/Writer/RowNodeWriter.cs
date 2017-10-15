using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Back_Project.code.Tool.Writer
{
    class RowNodeWriter
    {
        public string ObjectString(Data.RowNode dataRowNode)
        {
            string returnStr;
            int count = 0;
            Writer.CellNodeWriter cellNodeWrite = new CellNodeWriter();
            returnStr = "    " + dataRowNode.getCellNodeList()[0].getNum() + " : {";
            for(int i = 1; i < dataRowNode.getCellNodeList().Count; i++)
            {
                if (dataRowNode.getCellNodeList()[i] == null)
                {
                    continue;
                }
                returnStr = returnStr + ((count == 0) ? "\r\n" : ",\r\n") 
                    +  "    " + cellNodeWrite.getString(dataRowNode.getCellNodeList()[i]);
                count++;
            }
            returnStr = returnStr + "\r\n    " + "}";
            return returnStr;
        }

        public string ArrayString(Data.RowNode dataRowNode)
        {
            string returnStr;
            int count = 0;
            Writer.CellNodeWriter cellNodeWrite = new CellNodeWriter();
            returnStr = "    " + "{";
            for (int i = 0; i < dataRowNode.getCellNodeList().Count; i++)
            {
                if (dataRowNode.getCellNodeList()[i] == null)
                {
                    continue;
                }
                returnStr = returnStr + ((count == 0) ? "\r\n" : ",\r\n")
                    + "    " + cellNodeWrite.getString(dataRowNode.getCellNodeList()[i]);
                count++;
            }
            returnStr = returnStr + "\r\n    " + "}";
            return returnStr;
        }
    }
}
