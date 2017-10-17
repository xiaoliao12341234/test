using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Back_Project.code.Tool.Writer
{
    class TableNodeWriter
    {
        public string getString(Data.TableNode tableNode)
        {
            string returnStr;
            RowNodeWriter rowNodeWrite = new RowNodeWriter();
            returnStr = "{\r\n";
            returnStr = returnStr + "    " + '"' + "object" + '"' + " : {" + "\r\n";
            for (int i = 0; i < tableNode.getRowNodeList().Count; i++)
            {
                returnStr = returnStr + "    " + rowNodeWrite.ObjectString(tableNode.getRowNodeList()[i]) +
                    ((i == tableNode.getRowNodeList().Count - 1) ? "" : ",");
                returnStr = returnStr + "    " + "\r\n";
            }
            returnStr = returnStr + "    " + "},";

            returnStr = returnStr + "\r\n";
            returnStr = returnStr + "\r\n";

            returnStr = returnStr + "    " + '"' + "array" + '"' + " : [" + "\r\n";
            for (int i = 0; i < tableNode.getRowNodeList().Count; i++)
            {
                returnStr = returnStr + "    " + rowNodeWrite.ArrayString(tableNode.getRowNodeList()[i]) +
                    ((i == tableNode.getRowNodeList().Count - 1) ? "" : ",");
                returnStr = returnStr + "\r\n";
            }
            returnStr = returnStr + "    " + "]";

            returnStr = returnStr + "\r\n";

            returnStr = returnStr + "}";
            return returnStr;
        }
    }
}
