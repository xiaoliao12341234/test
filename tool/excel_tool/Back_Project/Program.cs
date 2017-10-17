using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.IO;

namespace Back_Project
{
    class Program
    {
        static void Main(string[] args)
        {
            //先清除原有的配置数据
            string workDir = Environment.CurrentDirectory;
            DirectoryInfo workDirInfo = new DirectoryInfo(workDir);
            string excelDataDirPath = workDirInfo.Parent.Parent.Parent.Parent.Parent.FullName +
                @"\client\cocos\CocosProject\assets\resources\Excel_Data";
            DirectoryInfo workExcelDirInfo = new DirectoryInfo(workDirInfo.Parent.Parent.Parent.Parent.Parent.FullName + @"\excel");
            if (Directory.Exists(excelDataDirPath))
            {
                Directory.Delete(excelDataDirPath, true);
            }
            Directory.CreateDirectory(excelDataDirPath);
            //开始执行每一个file
            foreach (FileInfo xmlFile in workExcelDirInfo.GetFiles())
            {
                if (xmlFile.Name.IndexOf(".xml") >= 0)
                {
                    string fileName = xmlFile.Name.Split('.')[0];
                    code.Tool.Reader.FileNodeReader fileNodeReader = 
                        new code.Tool.Reader.FileNodeReader(fileName, xmlFile.FullName);
                    code.Data.FileNode fileNode = fileNodeReader.getFileNode();
                    new code.Tool.Writer.FileNodeWriter().xmlDataWrite(fileNode, excelDataDirPath);
                }
            }
            Console.WriteLine("结束！按回车结束！");
            Console.ReadLine();
        }
    }
}
