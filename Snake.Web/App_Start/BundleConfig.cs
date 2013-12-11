using System.Web;
using System.Web.Mvc;
using System.Web.Optimization;

namespace Snake.Web
{
    public class BundleConfig
    {
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/snake").Include(
                "~/Game/*.js"   
            ));

            bundles.Add(new StyleBundle("~/Content/snake").Include(
                "~/Game/*.css"
            ));
        }
    }
}