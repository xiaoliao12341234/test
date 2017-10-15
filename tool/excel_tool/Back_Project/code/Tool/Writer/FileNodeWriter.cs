using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.IO;

namespace Back_Project.code.Tool.Writer
{
    class FileNodeWriter
    {
        public void xmlDataWrite(Data.FileNode fileNode, string excelDirFullPath)
        {
            string fileName = fileNode.getFileName();
            for(int i = 0; i < fileNode.getTableNodeList().Count; i++)
            {
                string sheetName = fileNode.getTableNodeList()[i].getSheetName();
                string xmlFileName = excelDirFullPath + @"\_table_" + fileName + "_" + sheetName + ".js";
                FileStream fs = new FileStream(xmlFileName, FileMode.OpenOrCreate);
                StreamWriter sw = new StreamWriter(fs);
                //开始写入
                sw.Write(new TableNodeWriter().getString(fileNode.getTableNodeList()[i]));
                //清空缓冲区
                sw.Flush();
                //关闭流
                sw.Close();
                fs.Close();
            }
        }
    }
}
